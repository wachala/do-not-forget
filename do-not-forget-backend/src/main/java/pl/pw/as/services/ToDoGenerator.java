package pl.pw.as.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.pw.as.model.generator.GeneratorStrategy;
import pl.pw.as.model.task.Task;
import pl.pw.as.utils.GeneratorSortStrategyFactory;

import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;
import java.util.function.Predicate;

import static java.util.stream.Collectors.toList;
import static pl.pw.as.model.task.TaskState.FINISHED;

@Slf4j
@Component
public class ToDoGenerator {

    @Autowired
    private GeneratorSortStrategyFactory generatorSortStrategyFactory;

    private final Predicate<Task> currentTask = task -> !FINISHED.equals(task.getState());

    public List<Task> generateTasks(List<Task> userTasks, GeneratorStrategy strategy, int timeAvailable) {
        log.info("Generating tasks with strategy {} and timeAvailable {}", strategy, timeAvailable);

        List<Task> candidates = findCandidates(userTasks, strategy);
        List<Task> taken = new LinkedList<>();

        for (Task candidate : candidates) {
            if (timeAvailable <= 0) break;

            timeAvailable -= candidate.getEstimateTime() - candidate.getSpendTime();
            taken.add(candidate);
        }

        return taken;
    }

    private List<Task> findCandidates(List<Task> userTasks, GeneratorStrategy strategy) {
        Comparator<Task> comparator = generatorSortStrategyFactory.getStrategy(strategy);

        return userTasks.stream()
                .filter(currentTask)
                .sorted(comparator)
                .collect(toList());
    }

}

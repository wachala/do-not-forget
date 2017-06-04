package pl.pw.as.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.pw.as.database.repository.TodoListRepository;
import pl.pw.as.database.repository.UserRepository;
import pl.pw.as.model.generator.GeneratorData;
import pl.pw.as.model.generator.GeneratorStrategy;
import pl.pw.as.model.generator.TodoList;
import pl.pw.as.model.task.Task;
import pl.pw.as.model.user.User;
import pl.pw.as.utils.GeneratorSortStrategyFactory;

import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;
import java.util.function.Predicate;

import static java.util.stream.Collectors.toList;
import static pl.pw.as.model.task.TaskState.FINISHED;
import static pl.pw.as.utils.CustomDateUtils.*;

@Slf4j
@Component
public class TodoListService {

    @Autowired
    private GeneratorSortStrategyFactory generatorSortStrategyFactory;

    @Autowired
    private TodoListRepository todoListRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskService taskService;

    private final Predicate<Task> currentTask = task -> !FINISHED.equals(task.getState()) && !isInPast(task.getDeadLine());

    public List<Task> generateTodoList(User user, GeneratorStrategy strategy, int timeAvailable) {
        List<Task> userTasks = taskService.getAllUserTasks(user);

        List<Task> tasks = generateTasks(userTasks, strategy, timeAvailable);
        updateUserTodoList(user, tasks, strategy, timeAvailable);

        return tasks;
    }

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

    public TodoList getPreviouslyGeneratedTodoList(User user) {
        return user.getPreviousTodoList();
    }

    private List<Task> findCandidates(List<Task> userTasks, GeneratorStrategy strategy) {
        Comparator<Task> comparator = generatorSortStrategyFactory.getStrategy(strategy);

        return userTasks.stream()
                .filter(currentTask)
                .sorted(comparator)
                .collect(toList());
    }

    private void updateUserTodoList(User user, List<Task> tasks, GeneratorStrategy strategy, int timeAvailable) {
        log.info("Updating previously generated todo list for user {}", user.getEmail());

        GeneratorData generatorData = GeneratorData.builder()
                .strategy(strategy)
                .timeAvailable(timeAvailable)
                .build();

        TodoList todoList = TodoList.builder()
                .generatorData(generatorData)
                .tasksTodo(tasks)
                .build();

        todoListRepository.insert(todoList);
        user.setPreviousTodoList(todoList);
        userRepository.save(user);
    }

}

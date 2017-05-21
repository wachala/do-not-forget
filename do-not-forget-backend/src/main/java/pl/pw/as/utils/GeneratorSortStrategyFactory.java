package pl.pw.as.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.pw.as.converters.CustomDateToJavaDateConverter;
import pl.pw.as.model.generator.GeneratorStrategy;
import pl.pw.as.model.task.Task;

import java.util.Collections;
import java.util.Comparator;
import java.util.EnumMap;
import java.util.Map;

import static java.util.Comparator.comparing;
import static java.util.Comparator.comparingInt;
import static pl.pw.as.model.generator.GeneratorStrategy.*;

@Component
public class GeneratorSortStrategyFactory {

    private Map<GeneratorStrategy, Comparator<Task>> sortStrategy;

    @Autowired
    public GeneratorSortStrategyFactory(CustomDateToJavaDateConverter customDateConverter) {
        sortStrategy = new EnumMap<>(GeneratorStrategy.class);

        sortStrategy.put(PRIORITY, comparingInt(Task::getPriority).reversed());
        sortStrategy.put(OLDEST, comparing(task -> customDateConverter.toJavaDate(task.getAddedDate())));
        sortStrategy.put(DEADLINE, Collections.reverseOrder(comparing(a -> customDateConverter.toJavaDate(a.getDeadLine()))));
        sortStrategy.put(VARIETY, comparingInt(a -> a.getEstimateTime() - a.getSpendTime()));
    }

    public Comparator<Task> getStrategy(GeneratorStrategy strategy) {
        return sortStrategy.get(strategy);
    }

}

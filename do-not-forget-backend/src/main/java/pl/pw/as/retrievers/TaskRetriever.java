package pl.pw.as.retrievers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.pw.as.converters.CustomDateToJavaDateConverter;
import pl.pw.as.model.task.Task;
import pl.pw.as.utils.CustomDateUtils;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class TaskRetriever {
    private final CustomDateToJavaDateConverter customDateToJavaDateConverter;

    @Autowired
    public TaskRetriever(CustomDateToJavaDateConverter customDateToJavaDateConverter) {
        this.customDateToJavaDateConverter = customDateToJavaDateConverter;
    }

    public List<Task> retrieveTasksExpiredAfter(List<Task> tasks, LocalDate date) {
        return tasks.stream()
                .filter(task -> CustomDateUtils.isInPast(task.getDeadLine())
                        && customDateToJavaDateConverter.toJavaDate(task.getDeadLine()).isAfter(date)
                        || customDateToJavaDateConverter.toJavaDate(task.getDeadLine()).isEqual(date))
                .collect(Collectors.toList());
    }
}

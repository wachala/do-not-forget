package pl.pw.as.model.generator;

import lombok.Builder;
import lombok.Value;
import org.springframework.data.mongodb.core.mapping.DBRef;
import pl.pw.as.model.task.Task;

import java.util.List;

@Value
@Builder
public class TodoList {
    private int timeAvailable;
    private GeneratorStrategy strategy;
    @DBRef
    private List<Task> tasksTodo;
}

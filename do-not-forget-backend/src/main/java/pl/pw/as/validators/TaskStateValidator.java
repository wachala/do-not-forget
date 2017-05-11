package pl.pw.as.validators;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import pl.pw.as.model.task.Task;

import java.util.Objects;

@Component
@Slf4j
public class TaskStateValidator implements Validator<Task> {
    @Override
    public void validate(Task task) {
        log.info("Validating task with title {}", task.getTitle());

        if (Objects.isNull(task.getState())) {
            throw new RuntimeException("Task state must be: New, In Progress, or Finished\n");
        }
    }
}

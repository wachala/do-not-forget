package pl.pw.as.validators;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import pl.pw.as.model.task.Task;
import pl.pw.as.model.task.TaskState;

import java.util.Objects;

@Component
@Slf4j
public class TaskStateValidator implements Validator<TaskState> {
    @Override
    public void validate(TaskState taskState) {
        log.info("Validating task state");

        if (Objects.isNull(taskState)) {
            throw new RuntimeException("Task state must be: New, In Progress, or Finished\n");
        }
    }
}

package pl.pw.as.validators;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import pl.pw.as.model.task.Task;
import pl.pw.as.utils.CustomDateUtils;

import java.util.Objects;

import static pl.pw.as.utils.IntegerUtils.isNotInRange;

@Component
@Slf4j
public class TaskValidator implements Validator<Task> {
    private static final int MIN_PRIORITY = 0;
    private static final int MAX_PRIORITY = 100;
    private static final int MIN_ESTIMATION_TIME = 0;
    private static final int MAX_ESTIMATION_TIME = 9999;

    @Override
    public void validate(Task task) {
        log.info("Validating task with title {}", task.getTitle());

        String errorMessage = "";
        boolean invalid = false;

        if (Objects.isNull(task.getTitle()) || task.getTitle().length() > 255) {
            errorMessage += "Incorrect title(max length 255)\n";
            invalid = true;
        }

        if (Objects.isNull(task.getDeadLine()) || CustomDateUtils.isInPast(task.getDeadLine())) {
            errorMessage += "Deadline must be in future and must be correct date\n";
            invalid = true;
        }

        if (isNotInRange(task.getPriority(), MIN_PRIORITY, MAX_PRIORITY)) {
            errorMessage += "Priority must be between " + MIN_PRIORITY + " and " + MAX_PRIORITY + "\n";
            invalid = true;
        }

        if (isNotInRange(task.getEstimateTime(), MIN_ESTIMATION_TIME, MAX_ESTIMATION_TIME)) {
            errorMessage += "Estimate time must be between " + MIN_ESTIMATION_TIME + " and " + MAX_ESTIMATION_TIME + "\n";
            invalid = true;
        }

        if (invalid)
            throw new RuntimeException(errorMessage);
    }
}

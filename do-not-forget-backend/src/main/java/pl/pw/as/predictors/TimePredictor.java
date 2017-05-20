package pl.pw.as.predictors;

import pl.pw.as.model.task.Task;

import java.util.List;

public interface TimePredictor {
    long predict(List<Task> tasks, String pattern);
}

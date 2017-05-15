package pl.pw.as.predictors;

import pl.pw.as.finders.TaskFinder;
import pl.pw.as.model.task.Task;

import java.util.List;

public class TimePredictor {
    public static long predict(List<Task> tasks, String pattern) {
        List<Task> finishedTasks = TaskFinder.findFinishedTasks(tasks);
        List<Task> finishedTasksWithSimilarTitle = TaskFinder.findTasksWithSimilarTitle(finishedTasks, pattern);
        return Math.round(finishedTasksWithSimilarTitle.stream().mapToInt(Task::getSpendTime).average().orElse(0.0));
    }
}

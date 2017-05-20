package pl.pw.as.predictors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.pw.as.finders.TaskFinder;
import pl.pw.as.model.task.Task;

import java.util.List;

@Component
public class TimePredictorImpl implements TimePredictor {

    private TaskFinder taskFinder;

    @Autowired
    public TimePredictorImpl(TaskFinder taskFinder) {
        this.taskFinder = taskFinder;
    }

    public long predict(List<Task> tasks, String pattern) {
        List<Task> finishedTasks = taskFinder.findFinishedTasks(tasks);
        List<Task> finishedTasksWithSimilarTitle = taskFinder.findTasksWithSimilarTitle(finishedTasks, pattern);
        return Math.round(finishedTasksWithSimilarTitle.stream().mapToInt(Task::getSpendTime).average().orElse(0.0));
    }
}

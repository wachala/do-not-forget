package pl.pw.as.finders;

import pl.pw.as.model.task.Task;
import pl.pw.as.model.task.TaskState;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public interface TaskFinder {
    default List<Task> findFinishedTasks(List<Task> tasks) {
        return tasks.stream()
                .filter(task -> Objects.equals(task.getState(), TaskState.FINISHED))
                .collect(Collectors.toList());
    }

    List<Task> findTasksWithSimilarTitle(List<Task> tasks, String input);
}

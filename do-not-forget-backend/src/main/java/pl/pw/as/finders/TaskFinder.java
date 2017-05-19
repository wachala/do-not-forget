package pl.pw.as.finders;

import com.google.common.base.Splitter;
import pl.pw.as.model.task.Task;
import pl.pw.as.model.task.TaskState;

import java.util.List;
import java.util.Objects;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class TaskFinder {
    public static List<Task> findFinishedTasks(List<Task> tasks) {
        return tasks.stream()
                .filter(task -> Objects.equals(task.getState(), TaskState.FINISHED))
                .collect(Collectors.toList());
    }

    public static List<Task> findTasksWithSimilarTitle(List<Task> tasks, String input) {
        List<String> inputWords = splitTitle(input);
        return tasks.stream()
                .filter(task -> areTitlesSimilar(task.getTitle(), inputWords))
                .collect(Collectors.toList());
    }

    private static boolean areTitlesSimilar(String taskTitle, List<String> inputTitleWords) {
        List<String> titleWords = splitTitle(taskTitle);
        return titleWords.containsAll(inputTitleWords) && inputTitleWords.containsAll(titleWords);
    }

    private static List<String> splitTitle(String title) {
        return Splitter.on(Pattern.compile("[\\s,_\\-.']")).omitEmptyStrings().trimResults().splitToList(title);
    }
}

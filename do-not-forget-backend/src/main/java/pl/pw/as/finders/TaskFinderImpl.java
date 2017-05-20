package pl.pw.as.finders;

import com.google.common.base.Splitter;
import org.springframework.stereotype.Component;
import pl.pw.as.model.task.Task;

import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Component
public class TaskFinderImpl implements TaskFinder {

    public List<Task> findTasksWithSimilarTitle(List<Task> tasks, String input) {
        List<String> inputWords = splitTitle(input);
        return tasks.stream()
                .filter(task -> areTitlesSimilar(task.getTitle(), inputWords))
                .collect(Collectors.toList());
    }

    private boolean areTitlesSimilar(String taskTitle, List<String> inputTitleWords) {
        List<String> titleWords = splitTitle(taskTitle);
        return titleWords.containsAll(inputTitleWords) && inputTitleWords.containsAll(titleWords);
    }

    private List<String> splitTitle(String title) {
        return Splitter.on(Pattern.compile("[\\s,_\\-.']")).omitEmptyStrings().trimResults().splitToList(title);
    }
}

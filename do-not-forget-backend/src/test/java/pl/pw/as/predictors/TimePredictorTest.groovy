package pl.pw.as.predictors

import com.google.common.collect.ImmutableList
import pl.pw.as.model.task.CustomDate
import pl.pw.as.model.task.Task
import pl.pw.as.model.task.TaskState
import spock.lang.Specification

class TimePredictorTest extends Specification {
    def "should predict time of task with given title"() {
        expect:
        TimePredictor.predict(tasks, "do math homework") == result

        where:
        tasks                    | result
        allTasks()               | 25
        noFinishedTask()         | 0
        noTaskWithSimilarTitle() | 0
    }

    List<Task> allTasks() {
        Task task1 = createHomeworkTask("1", "math", 20, TaskState.FINISHED)
        Task task2 = createHomeworkTask("2", "chemistry", 60, TaskState.FINISHED)
        Task task3 = createLaundryTask("3", 20, TaskState.FINISHED)
        Task task4 = createHomeworkTask("4", "history", 10, TaskState.IN_PROGRESS)
        Task task5 = createHomeworkTask("6", "math", 30, TaskState.FINISHED)
        return ImmutableList.of(task1, task2, task3, task4, task5)
    }

    List<Task> noFinishedTask() {
        Task task1 = createHomeworkTask("1", "math", 30, TaskState.IN_PROGRESS)
        Task task2 = createHomeworkTask("2", "math", 30, TaskState.NEW)
        Task task3 = createHomeworkTask("3", "chemistry", 30, TaskState.IN_PROGRESS)
        return ImmutableList.of(task1, task2, task3)
    }

    List<Task> noTaskWithSimilarTitle() {
        Task task1 = createLaundryTask("1", 20, TaskState.FINISHED)
        Task task2 = createHomeworkTask("2", "math and chemistry", 30, TaskState.FINISHED)
        Task task3 = createHomeworkTask("3", "chemistry", 20, TaskState.FINISHED)
        return ImmutableList.of(task1, task2, task3)
    }

    Task createHomeworkTask(String id, String subject, int spendTime, TaskState state) {
        String title = String.format("do %s homework", subject)
        return new Task(id, 30, spendTime, 1, new CustomDate(12, 5, 2017), new CustomDate(12, 5, 2017), title, "", state)
    }

    Task createLaundryTask(String id, int spendTime, TaskState state) {
        return new Task(id, 20, spendTime, 1, new CustomDate(12, 5, 2017), new CustomDate(12, 5, 2017), "do laundry", "", state)
    }
}

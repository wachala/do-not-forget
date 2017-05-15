package pl.pw.as.predictors

import com.google.common.collect.ImmutableList
import pl.pw.as.model.task.CustomDate
import pl.pw.as.model.task.Task
import pl.pw.as.model.task.TaskState
import spock.lang.Specification


class TimePredictorTest extends Specification {
    def "should predict time of task with given title"() {
        expect:
        TimePredictor.predict(tasks, "do homework") == result

        where:
        tasks | result
        allTasks() | 17
        noFinishedTask() | 0
        noTaskWithSimilarTitle() | 0
    }

    List<Task> allTasks() {
        Task task1 = new Task("1", 30, 20, 1, new CustomDate(12, 5, 2017), new CustomDate(25, 5, 2017), "do math homework", "", TaskState.FINISHED)
        Task task2 = new Task("2", 10, 13, 1, new CustomDate(12, 5, 2017), new CustomDate(12, 5, 2017), "do chemistry homework", "", TaskState.FINISHED)
        Task task3 = new Task("3", 20, 20, 1, new CustomDate(12, 5, 2017), new CustomDate(12, 5, 2017), "do laundry", "", TaskState.FINISHED)
        Task task4 = new Task("4", 20, 20, 1, new CustomDate(12, 5, 2017), new CustomDate(12, 5, 2017), "do history homework", "", TaskState.IN_PROGRESS)
        Task task5 = new Task("5", 20, 20, 1, new CustomDate(12, 5, 2017), new CustomDate(12, 5, 2017), "do history homework", "", TaskState.NEW)
        return ImmutableList.of(task1, task2, task3, task4, task5)
    }

    List<Task> noFinishedTask() {
        Task task1 = new Task("1", 30, 20, 1, new CustomDate(12, 5, 2017), new CustomDate(25, 5, 2017), "do math homework", "", TaskState.IN_PROGRESS)
        Task task2 = new Task("2", 10, 20, 1, new CustomDate(12, 5, 2017), new CustomDate(12, 5, 2017), "do chemistry homework", "", TaskState.NEW)
        Task task3 = new Task("3", 20, 20, 1, new CustomDate(12, 5, 2017), new CustomDate(12, 5, 2017), "do laundry", "", TaskState.IN_PROGRESS)
        Task task4 = new Task("4", 20, 20, 1, new CustomDate(12, 5, 2017), new CustomDate(12, 5, 2017), "do history homework", "", TaskState.IN_PROGRESS)
        Task task5 = new Task("5", 20, 20, 1, new CustomDate(12, 5, 2017), new CustomDate(12, 5, 2017), "do history homework", "", TaskState.NEW)
        return ImmutableList.of(task1, task2, task3, task4, task5)
    }

    List<Task> noTaskWithSimilarTitle() {
        Task task1 = new Task("1", 30, 20, 1, new CustomDate(12, 5, 2017), new CustomDate(25, 5, 2017), "do something", "", TaskState.FINISHED)
        Task task2 = new Task("2", 10, 20, 1, new CustomDate(12, 5, 2017), new CustomDate(12, 5, 2017), "do chemistry ", "", TaskState.FINISHED)
        Task task3 = new Task("3", 20, 20, 1, new CustomDate(12, 5, 2017), new CustomDate(12, 5, 2017), "do laundry", "", TaskState.FINISHED)
        Task task4 = new Task("4", 20, 20, 1, new CustomDate(12, 5, 2017), new CustomDate(12, 5, 2017), "do history", "", TaskState.FINISHED)
        return ImmutableList.of(task1, task2, task3, task4)
    }
}

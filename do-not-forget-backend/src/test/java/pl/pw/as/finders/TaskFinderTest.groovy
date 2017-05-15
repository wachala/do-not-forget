package pl.pw.as.finders

import com.google.common.collect.ImmutableList
import pl.pw.as.model.task.CustomDate
import pl.pw.as.model.task.Task
import pl.pw.as.model.task.TaskState
import spock.lang.Specification

class TaskFinderTest extends Specification {
    def "should find tasks with similar title"() {
        expect:
        TaskFinder.findTasksWithSimilarTitle(allTasks(), title).containsAll(taskWithSimilarTitle())

        where:
        title << ["do homework", "do,homework", "do. homework", "do - - homework", "do   _ homework"]
    }

    def "should find tasks with finished state"() {
        expect:
        TaskFinder.findFinishedTasks(allTasks()).containsAll(finishedTasks())
    }

    List<Task> allTasks() {
        Task task1 = new Task("1", 20, 20, 1, new CustomDate(12, 5, 2017), new CustomDate(25, 5, 2017), "do math-homework", "", TaskState.FINISHED)
        Task task2 = new Task("2", 20, 20, 1, new CustomDate(12, 5, 2017), new CustomDate(12, 5, 2017), "do chemistry homework", "", TaskState.FINISHED)
        Task task3 = new Task("3", 20, 20, 1, new CustomDate(12, 5, 2017), new CustomDate(12, 5, 2017), "do laundry", "", TaskState.FINISHED)
        Task task4 = new Task("4", 20, 20, 1, new CustomDate(12, 5, 2017), new CustomDate(12, 5, 2017), "do history homework", "", TaskState.IN_PROGRESS)
        Task task5 = new Task("5", 20, 20, 1, new CustomDate(12, 5, 2017), new CustomDate(12, 5, 2017), "do history homework", "", TaskState.NEW)
        return ImmutableList.of(task1, task2, task3, task4, task5)
    }

    List<Task> taskWithSimilarTitle() {
        Task task1 = new Task("1", 20, 20, 1, new CustomDate(12, 5, 2017), new CustomDate(25, 5, 2017), "do math-homework", "", TaskState.FINISHED)
        Task task2 = new Task("2", 20, 20, 1, new CustomDate(12, 5, 2017), new CustomDate(12, 5, 2017), "do chemistry homework", "", TaskState.FINISHED)
        Task task3 = new Task("4", 20, 20, 1, new CustomDate(12, 5, 2017), new CustomDate(12, 5, 2017), "do history homework", "", TaskState.IN_PROGRESS)
        Task task4 = new Task("5", 20, 20, 1, new CustomDate(12, 5, 2017), new CustomDate(12, 5, 2017), "do history homework", "", TaskState.NEW)
        return ImmutableList.of(task1, task2, task3, task4)
    }

    List<Task> finishedTasks() {
        Task task1 = new Task("1", 20, 20, 1, new CustomDate(12, 5, 2017), new CustomDate(25, 5, 2017), "do math-homework", "", TaskState.FINISHED)
        Task task2 = new Task("2", 20, 20, 1, new CustomDate(12, 5, 2017), new CustomDate(12, 5, 2017), "do chemistry homework", "", TaskState.FINISHED)
        Task task3 = new Task("3", 20, 20, 1, new CustomDate(12, 5, 2017), new CustomDate(12, 5, 2017), "do laundry", "", TaskState.FINISHED)
        return ImmutableList.of(task1, task2, task3)
    }
}

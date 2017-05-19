package pl.pw.as.finders

import com.google.common.collect.ImmutableList
import pl.pw.as.model.task.CustomDate
import pl.pw.as.model.task.Task
import pl.pw.as.model.task.TaskState
import spock.lang.Specification

class TaskFinderTest extends Specification {
    def "should find tasks with similar title"() {
        expect:
        TaskFinder.findTasksWithSimilarTitle(allTasks(), title).size() == taskWithSimilarTitle().size()
        TaskFinder.findTasksWithSimilarTitle(allTasks(), title).containsAll(taskWithSimilarTitle())

        where:
        title << ["do math homework", "do,math,homework", "do. math'homework", "do - math - homework", "do   math_ homework"]
    }

    def "should find tasks with finished state"() {
        expect:
        TaskFinder.findFinishedTasks(allTasks()).size() == finishedTasks().size()
        TaskFinder.findFinishedTasks(allTasks()).containsAll(finishedTasks())
    }

    List<Task> allTasks() {
        Task task1 = createHomeworkTask("1", "math-", 30, TaskState.FINISHED)
        Task task2 = createHomeworkTask("2", "chemistry", 10, TaskState.FINISHED)
        Task task3 = createLaundryTask("3", 60, TaskState.FINISHED)
        Task task4 = createHomeworkTask("4", ",math,", 40, TaskState.IN_PROGRESS)
        Task task5 = createHomeworkTask("5", "_math '", 35, TaskState.NEW)
        return ImmutableList.of(task1, task2, task3, task4, task5)
    }

    List<Task> taskWithSimilarTitle() {
        Task task1 = createHomeworkTask("1", "math-", 30, TaskState.FINISHED)
        Task task2 = createHomeworkTask("4", ",math,", 40, TaskState.IN_PROGRESS)
        Task task3 = createHomeworkTask("5", "_math '", 35, TaskState.NEW)
        return ImmutableList.of(task1, task2, task3)
    }

    List<Task> finishedTasks() {
        Task task1 = createHomeworkTask("1", "math-", 30, TaskState.FINISHED)
        Task task2 = createHomeworkTask("2", "chemistry", 10, TaskState.FINISHED)
        Task task3 = createLaundryTask("3", 60, TaskState.FINISHED)
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

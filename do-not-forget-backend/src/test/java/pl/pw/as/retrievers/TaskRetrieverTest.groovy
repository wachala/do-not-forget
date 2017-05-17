package pl.pw.as.retrievers

import pl.pw.as.model.task.Task
import pl.pw.as.utils.CustomDateUtils
import spock.lang.Shared
import spock.lang.Specification

import java.time.LocalDate

class TaskRetrieverTest extends Specification {

    @Shared
    private TaskRetriever taskRetriever = new TaskRetriever()

    private static Task notExpiredTask = Task.builder().title("not expired").deadLine(CustomDateUtils.now()).build()
    private static Task notExpiredBeforeLastBrowse = Task.builder().title("expired before last browse").deadLine(CustomDateUtils.of(10, 12, 2016)).build()
    private static Task expiredAfterLastBrowse = Task.builder().title("expired after last browse").deadLine(CustomDateUtils.of(12, 12, 2016)).build()

    private static LocalDate date = LocalDate.of(2016, 12, 11)

    def "should return task expired after last browse"() {
        expect:
        actual == expected

        where:
        actual                                                                                                              | expected
        taskRetriever.retrieveTasksExpiredAfter([notExpiredTask, notExpiredBeforeLastBrowse, expiredAfterLastBrowse], date) | [expiredAfterLastBrowse]
        taskRetriever.retrieveTasksExpiredAfter([notExpiredBeforeLastBrowse], date)                                         | []
        taskRetriever.retrieveTasksExpiredAfter([], date)                                                                   | []
        taskRetriever.retrieveTasksExpiredAfter([expiredAfterLastBrowse], date)                                             | [expiredAfterLastBrowse]
    }
}

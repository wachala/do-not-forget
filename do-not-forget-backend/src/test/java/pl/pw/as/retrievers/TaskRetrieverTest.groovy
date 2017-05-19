package pl.pw.as.retrievers

import pl.pw.as.converters.CustomDateToJavaDateConverter
import pl.pw.as.model.task.Task
import pl.pw.as.utils.CustomDateUtils
import spock.lang.Shared
import spock.lang.Specification

import java.time.LocalDate

class TaskRetrieverTest extends Specification {

    @Shared
    private TaskRetriever taskRetriever = new TaskRetriever(new CustomDateToJavaDateConverter())

    private static Task notExpiredTask = Task.builder().title("not expired").deadLine(CustomDateUtils.now()).build()
    private
    static Task notExpiredBeforeLastBrowse = Task.builder().title("expired before last browse").deadLine(CustomDateUtils.of(10, 12, 2016)).build()
    private
    static Task expiredAfterLastBrowse = Task.builder().title("expired after last browse").deadLine(CustomDateUtils.of(12, 12, 2016)).build()

    private static LocalDate date = LocalDate.of(2016, 12, 11)

    def "should return task expired after last browse"() {
        expect:
        taskRetriever.retrieveTasksExpiredAfter(allTasks, lastBrowseDate) == expected

        where:
        allTasks                                                             | lastBrowseDate | expected
        [notExpiredTask, notExpiredBeforeLastBrowse, expiredAfterLastBrowse] | date           | [expiredAfterLastBrowse]
        [notExpiredBeforeLastBrowse]                                         | date           | []
        []                                                                   | date           | []
        [expiredAfterLastBrowse]                                             | date           | [expiredAfterLastBrowse]
    }
}

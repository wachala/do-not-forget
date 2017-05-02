package pl.pw.as.validators

import pl.pw.as.model.task.CustomDate
import pl.pw.as.model.task.Task
import spock.lang.Shared
import spock.lang.Specification
import spock.lang.Unroll

import java.time.LocalDate

class TaskValidatorTest extends Specification {
    def taskValidator = new TaskValidator()
    @Shared
    def todayLocalDate = LocalDate.now()
    @Shared
    def yesterdayLocalDate = todayLocalDate.minusDays(1)
    @Shared
    def dayAfterTomorrow = new CustomDate(
            day: todayLocalDate.getDayOfMonth(),
            month: todayLocalDate.getMonthValue(),
            year: todayLocalDate.getYear()
    )
    @Shared
    def yesterday = new CustomDate(
            day: yesterdayLocalDate.getDayOfMonth(),
            month: yesterdayLocalDate.getMonthValue(),
            year: yesterdayLocalDate.getYear()
    )
    @Shared
    def tooLongString

    def setupSpec() {
        def builder = new StringBuilder()

        for (int i = 0; i <= 255; i++) builder.append('a');

        tooLongString = builder.toString()
    }

    @Unroll
    def "should throw an exception when task incorrect"() {
        given:
        def task = new Task(
                title: title,
                deadLine: deadline,
                priority: priority,
                estimateTime: estimatedTime
        )

        when:
        taskValidator.validate(task)

        then:
        thrown RuntimeException

        where:
        title         | deadline         | priority | estimatedTime
        null          | dayAfterTomorrow | 10       | 120
        tooLongString | dayAfterTomorrow | 10       | 120
        "Sample"      | null             | 10       | 120
        "Sample"      | yesterday        | 10       | 120
        "Sample"      | dayAfterTomorrow | -10      | 120
        "Sample"      | dayAfterTomorrow | 101      | -1
        "Sample"      | dayAfterTomorrow | 101      | 10000
    }

    def "should not throw an exception when task correct"() {
        given:
        def task = new Task(
                title: "Sample title",
                deadLine: dayAfterTomorrow,
                priority: 10,
                estimateTime: 200
        )

        when:
        taskValidator.validate(task)

        then:
        noExceptionThrown()
    }

}

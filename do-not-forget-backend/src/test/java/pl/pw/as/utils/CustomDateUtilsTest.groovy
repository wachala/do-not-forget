package pl.pw.as.utils

import pl.pw.as.model.task.CustomDate
import spock.lang.Specification
import spock.lang.Unroll

import java.time.LocalDate

class CustomDateUtilsTest extends Specification {

    @Unroll
    def "should return true if data is in past and false otherwise"() {
        expect:
        CustomDateUtils.isInPast(customDate) == result

        where:
        customDate     | result
        getTommorow()  | false
        getToday()     | false
        getWrongDate() | true
        getYesterday() | true
    }

    private CustomDate getTommorow() {
        return new CustomDate(LocalDate.now().getDayOfMonth() + 1, LocalDate.now().getMonthValue(), LocalDate.now().getYear())
    }

    private CustomDate getWrongDate() {
        return new CustomDate(40, 40, 2000)
    }

    private CustomDate getYesterday() {
        return new CustomDate(LocalDate.now().getDayOfMonth() - 1, LocalDate.now().getMonthValue(), LocalDate.now().getYear())
    }

    private CustomDate getToday() {
        def today = LocalDate.now()
        return new CustomDate(
                day: today.getDayOfMonth(),
                month: today.getMonthValue(),
                year: today.getYear()
        )
    }
}

package pl.pw.as.utils

import pl.pw.as.model.task.CustomDate
import spock.lang.Specification

import java.time.LocalDate

class CustomDateUtilsTest extends Specification {
    def "should return true if data is in future and false in other cases"() {
        expect:
        CustomDateUtils.isInFuture(customDate) == result

        where:
        customDate     || result
        getTommorow()  || true
        getWrongDate() || false
        getYesterday() || false


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
}

package pl.pw.as.converters

import pl.pw.as.model.task.CustomDate
import spock.lang.Specification

import java.time.LocalDate

class CustomDateToJavaDateConverterTest extends Specification {

    CustomDateToJavaDateConverter converter = new CustomDateToJavaDateConverter()

    def "should convert custom date to local date"() {
        expect:
        converter.toJavaDate(customDate) == localDate

        where:
        customDate                   || localDate
        new CustomDate(11, 12, 1994) || LocalDate.of(1994, 12, 11)
    }

    def "should throw exception if data is incorrect"() {
        setup:
        CustomDate customDate = new CustomDate(40, 40, 2030)

        when:
        converter.toJavaDate(customDate)

        then:
        thrown Exception
    }

}

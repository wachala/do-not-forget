package pl.pw.as.utils

import spock.lang.Specification

class IntegerUtilsTest extends Specification {

    def "should is in range work"() {
        expect:
        IntegerUtils.isInRange(toCheck, min, max) == result

        where:
        toCheck | min | max || result
        1       | 0   | 2   || true
        5       | 0   | 2   || false
        -1      | 0   | 2   || false
    }
}

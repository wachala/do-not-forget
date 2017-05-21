package pl.pw.as.utils

import pl.pw.as.converters.CustomDateToJavaDateConverter
import pl.pw.as.test.utils.TestTaskFactory
import spock.lang.Specification

import static pl.pw.as.model.generator.GeneratorStrategy.*

class GeneratorSortStrategyFactoryTest extends Specification {
    def customDateConverter = new CustomDateToJavaDateConverter()
    def sortStrategyFactory = new GeneratorSortStrategyFactory(customDateConverter)
    def taskList

    def firstTask = TestTaskFactory.getFirstTask()
    def secondTask = TestTaskFactory.getSecondTask()
    def thirdTask = TestTaskFactory.getThirdTask()
    def fourthTask = TestTaskFactory.getFourthTask()

    def setup() {
        taskList = [firstTask, secondTask, thirdTask, fourthTask]
    }

    def "should return priority comparator for PRIORITY strategy"() {
        when:
        def comparator = sortStrategyFactory.getStrategy(PRIORITY)

        then:
        taskList.sort(comparator)
        taskList == [thirdTask, fourthTask, firstTask, secondTask]
    }

    def "should return added date comparator for OLDEST strategy"() {
        when:
        def comparator = sortStrategyFactory.getStrategy(OLDEST)

        then:
        taskList.sort(comparator)
        taskList == [thirdTask, fourthTask, secondTask, firstTask]
    }

    def "should return deadline comparator for DEADLINE strategy"() {
        when:
        def comparator = sortStrategyFactory.getStrategy(DEADLINE)

        then:
        taskList.sort(comparator)
        taskList == [secondTask, firstTask, fourthTask, thirdTask]
    }

    def "should return necessary time comparator for VARIETY strategy"() {
        when:
        def comparator = sortStrategyFactory.getStrategy(VARIETY)

        then:
        taskList.sort(comparator)
        taskList == [thirdTask, secondTask, fourthTask, firstTask]
    }

}

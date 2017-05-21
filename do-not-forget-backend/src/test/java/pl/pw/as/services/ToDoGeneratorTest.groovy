package pl.pw.as.services

import pl.pw.as.converters.CustomDateToJavaDateConverter
import pl.pw.as.model.task.Task
import pl.pw.as.test.utils.TestTaskFactory
import pl.pw.as.utils.GeneratorSortStrategyFactory
import spock.lang.Shared
import spock.lang.Specification
import spock.lang.Unroll

import static pl.pw.as.model.generator.GeneratorStrategy.*
import static pl.pw.as.model.task.TaskState.FINISHED
import static pl.pw.as.model.task.TaskState.NEW

class ToDoGeneratorTest extends Specification {
    @Shared
    GeneratorSortStrategyFactory generatorSortStrategyFactory = new GeneratorSortStrategyFactory(
            new CustomDateToJavaDateConverter()
    )

    @Shared
    def todoGenerator = new ToDoGenerator(
            generatorSortStrategyFactory: generatorSortStrategyFactory
    )

    def allTasks
    @Shared
    def firstTask = TestTaskFactory.getFirstTask()
    @Shared
    def secondTask = TestTaskFactory.getSecondTask()
    @Shared
    def thirdTask = TestTaskFactory.getThirdTask()
    @Shared
    def fourthTask = TestTaskFactory.getFourthTask()
    @Shared
    def fifthTask = TestTaskFactory.getFifthTask()
    @Shared
    def sixthTask = TestTaskFactory.getSixthTask()

    def setup() {
        allTasks = [firstTask, secondTask, thirdTask, fourthTask, fifthTask, sixthTask]
    }

    def "should skip finished tasks"() {
        when:
        def userTasks = [new Task(priority: 100, state: FINISHED, spendTime: 15, estimateTime: 30),
                         new Task(priority: 100, state: FINISHED, spendTime: 10, estimateTime: 20),
                         new Task(priority: 100, state: NEW, spendTime: 0, estimateTime: 20)]

        def result = todoGenerator.generateTasks(userTasks, PRIORITY, 100)

        then:
        result != null
        result.size() == 1
        result.get(0).getState() == NEW
    }

    @Unroll
    def "should generate proper todo list for PRIORITY strategy"() {
        when:
        def result = todoGenerator.generateTasks(allTasks, strategy, timeAvailable)

        then:
        result == expectedResult

        where:
        strategy | timeAvailable | expectedResult
        PRIORITY | 200           | [thirdTask, fourthTask, sixthTask]
        OLDEST   | 230           | [thirdTask, fifthTask, sixthTask]
        DEADLINE | 120           | [secondTask, firstTask]
        VARIETY  | 45            | [thirdTask, secondTask]
    }

}
package pl.pw.as.test.utils

import pl.pw.as.model.task.CustomDate
import pl.pw.as.model.task.Task

import static pl.pw.as.model.task.TaskState.IN_PROGRESS
import static pl.pw.as.model.task.TaskState.NEW
import static pl.pw.as.utils.CustomDateUtils.of

public class TestTaskFactory {

    static Task getFirstTask() {
        return new Task(
                priority: 20,
                id: 1,
                state: IN_PROGRESS,
                addedDate: of(10, 5, 2017),
                estimateTime: 120,
                spendTime: 10,
                deadLine: of(20, 5, 2017)
        )
    }

    static Task getSecondTask() {
        return new Task(
                priority: 15,
                id: 2,
                state: NEW,
                addedDate: of(8, 5, 2017),
                estimateTime: 30,
                spendTime: 0,
                deadLine: of(10, 5, 2017))
    }

    static Task getThirdTask() {
        return new Task(
                priority: 100,
                id: 3,
                state: IN_PROGRESS,
                addedDate: of(12, 12, 2016),
                estimateTime: 20,
                spendTime: 5,
                deadLine: of(7, 7, 2017))
    }

    static Task getFourthTask() {
        return new Task(
                priority: 80,
                id: 4,
                state: IN_PROGRESS,
                addedDate: of(3, 4, 2017),
                estimateTime: 100,
                spendTime: 10,
                deadLine: of(18, 6, 2017))
    }

    static getFifthTask() {
        return new Task(
                priority: 10,
                id: 5,
                state: NEW,
                addedDate: new CustomDate(2, 1, 2017),
                estimateTime: 120,
                spendTime: 0,
                deadLine: new CustomDate(20, 6, 2017))
    }

    static getSixthTask() {
        return new Task(
                priority: 40,
                id: 6,
                state: NEW,
                addedDate: new CustomDate(1, 2, 2017),
                estimateTime: 100,
                spendTime: 0,
                deadLine: new CustomDate(15, 7, 2017))
    }

}

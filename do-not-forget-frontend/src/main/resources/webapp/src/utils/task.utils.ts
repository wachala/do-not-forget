import {DateValidationUtils} from "./date.validator.utils";
import {Task} from "../model/Task";
import {TaskState} from "../model/TaskState";
import {CustomDateAndDateConverter} from "../converters/CustomDateAndDateConverter";

export class TaskUtils {
    static isCurrentTask(task: Task) {
        return DateValidationUtils.isDateInTheFuture(task.deadLine);
    }

    static isHistoricalTask(task: Task) {
        return !TaskUtils.isCurrentTask(task);
    }

    static statePrettyPrint(state: TaskState) {
        return state ? state.toString().charAt(0) + state.toString().slice(1).toLowerCase().replace('_', ' ') : '';
    }

    static correctDateInTask(task) {
        task.deadLine = CustomDateAndDateConverter.fromArrayToDate(task.deadLine);
        task.addedDate = CustomDateAndDateConverter.fromArrayToDate(task.addedDate);
        return task;
    }
}
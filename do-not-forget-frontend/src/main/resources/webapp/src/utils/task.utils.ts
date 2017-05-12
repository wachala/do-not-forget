import {DateValidationUtils} from "./date.validator.utils";
import {Task} from "../model/Task";
import {TaskState} from "../model/TaskState";

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
}
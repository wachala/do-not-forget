import {TaskState} from "../model/TaskState";

export class TaskStateProvider {
    private _taskStateOptions = [
        {name: TaskState.NEW},
        {name: TaskState.IN_PROGRESS},
        {name: TaskState.FINISHED}
    ];

    public retrieveTaskStateLabel(state) {
        return this._taskStateOptions[state].name;
    }

    public retrieveTaskStateOptions() {
        return this._taskStateOptions;
    }

    public retrieveDefaultTaskStateIndex() {
        return TaskState.DEFAULT_INDEX;
    }


}
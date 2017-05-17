import {Component, Input} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../../url.constants";
import {Task} from "../../../model/Task";
import {CustomDate} from "../../../model/CustomDate";
import {TaskState} from "../../../model/TaskState";
import {TaskUtils} from "../../../utils/task.utils";
@Component({
    selector: 'task-view',
    templateUrl: URL_COMPONENT_BASE + 'browse/task-view/task-view.component.html'
//
})
export class TaskViewComponent {
    @Input('task') task: Task;
    @Input('show-state') showState: boolean = true;

    getDate(date: Date) {
        return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    }

    getState(state: TaskState) {
        return TaskUtils.statePrettyPrint(state);
    }

}
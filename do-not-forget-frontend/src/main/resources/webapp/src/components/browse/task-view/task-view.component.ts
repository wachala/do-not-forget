import {Component, Input, Output, EventEmitter} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../../url.constants";
import {Task} from "../../../model/Task";
import {CustomDate} from "../../../model/CustomDate";
import {TaskState} from "../../../model/TaskState";
import {TaskUtils} from "../../../utils/task.utils";
import {PriorityProvider} from "../../../providers/priority.provider";
import {Router} from "@angular/router";
import {TaskService} from "../../../services/TaskService";
import {ErrorService} from "../../../services/ErrorService";
import {AlertService} from "../../../services/AlertService";
@Component({
    selector: 'task-view',
    providers: [TaskService],
    templateUrl: URL_COMPONENT_BASE + 'browse/task-view/task-view.component.html'
//
})
export class TaskViewComponent {
    @Input('task') task: Task;
    @Input('show-state') showState: boolean = true;
    @Input('edit-enable') editEnable: boolean = true;
    @Input('edit-spend-time-enable') editSpendTimeEnable: boolean = true;
    @Input('delete-enable') deleteEnable: boolean = true;
    @Output('taskDelete') taskDelete: EventEmitter<Task> = new EventEmitter();
    @Output('taskTimeSpendEdit') taskTimeSpendEdit: EventEmitter<Task> = new EventEmitter();

    priorityProvider: PriorityProvider = new PriorityProvider();

    constructor(private _router: Router) {
    }

    getDate(date: CustomDate) {
        return date.day + '/' + date.month + '/' + date.year;
    }

    getState(state: TaskState) {
        return TaskUtils.statePrettyPrint(state);
    }

    getPriorityLabel(priority: number) {
        return this.priorityProvider.retrievePriorityLabel(priority);
    }

    edit() {
        this._router.navigate(['authorized/editTask/' + this.task.id])
    }

    remove () {
        this.taskDelete.emit(this.task);
    }

    editTimeSpend () {
        this.taskTimeSpendEdit.emit(this.task);
    }


}
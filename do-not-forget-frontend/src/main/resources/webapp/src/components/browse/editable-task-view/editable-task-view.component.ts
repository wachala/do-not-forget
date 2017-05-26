import {Component, Input, Output, EventEmitter} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../../url.constants";
import {Task} from "../../../model/Task";
import {CustomDate} from "../../../model/CustomDate";
import {TaskState} from "../../../model/TaskState";
import {TaskUtils} from "../../../utils/task.utils";
import {PriorityProvider} from "../../../providers/priority.provider";
import {Router} from "@angular/router";
import {TaskService} from "../../../services/TaskService";
import {TaskStateProvider} from "../../../providers/state.provider";
@Component({
    selector: 'editable-task-view',
    providers: [TaskService],
    templateUrl: URL_COMPONENT_BASE + 'browse/editable-task-view/editable-task-view.component.html'
//
})
export class EditableTaskViewComponent {
    @Input('task') task: Task;
    @Input('edit-enable') editEnable: boolean = true;
    @Input('edit-spend-time-enable') editSpendTimeEnable: boolean = true;
    @Input('delete-enable') deleteEnable: boolean = true;
    @Input('deadline-edit-enable') deadlineEditEnable: boolean = true;
    @Input('state-edit-enable') stateEditEnable: boolean = true;
    @Output('taskDelete') taskDelete: EventEmitter<Task> = new EventEmitter();
    @Output('taskTimeSpendEdit') taskTimeSpendEdit: EventEmitter<Task> = new EventEmitter();
    @Output('stateEdit') taskStateEdit: EventEmitter<Task> = new EventEmitter();
    @Output('deadLineEdit') deadLineEdit: EventEmitter<Task> = new EventEmitter();

    taskStateProvider: TaskStateProvider = new TaskStateProvider();
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

    editDeadline() {
        this.deadLineEdit.emit(this.task);
    }

    editState() {
        this.taskStateEdit.emit(this.task);
    }

}
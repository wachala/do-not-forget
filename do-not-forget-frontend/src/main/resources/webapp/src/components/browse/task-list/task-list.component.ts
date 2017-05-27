import {Component, Input, EventEmitter, Output} from "@angular/core";
import {TaskService} from "../../../services/TaskService";
import {AlertService} from "../../../services/AlertService";
import {ErrorService} from "../../../services/ErrorService";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {URL_COMPONENT_BASE} from "../../../url.constants";
import {Task} from "../../../model/Task";
import {AlertConfig} from "../../../model/alert/AlertConfig";
import {TaskUtils} from "../../../utils/task.utils";
@Component({
    selector: 'task-list',
    providers: [TaskService, AlertService, ErrorService, NgbModal],
    templateUrl: URL_COMPONENT_BASE + 'browse/task-list/task-list.component.html'
//
})
export class TaskListComponent {
    @Input('taskList') taskList: Array<Task>;
    @Input('editable') editable: boolean = true;
    @Output('tasksChanged') tasksChanged: EventEmitter<any> = new EventEmitter();


    //filter
    taskFilterString = "";

    alertConfig: AlertConfig = AlertConfig.getAlertToClose();

    //spending time func
    spendTimeVal = 0;
    spendTimeDismissEnable = true;
    currentTaskTitle = '';

    constructor(private _taskService: TaskService, private _alertService: AlertService,
                private _errorService: ErrorService, private _modalService: NgbModal) {

    }

    changeTaskState(event) {
        let task: Task = event as Task;
        let taskState = task.state;
        let taskTitle = task.title;
        this._taskService.editTaskState(task)
            .subscribe(
                (success) => {
                    this.tasksChanged.emit();
                    this.alertConfig = this._alertService.retrieveSuccessAlertShowConfig('State of task "' + taskTitle + '" changed to: ' + TaskUtils.statePrettyPrint(taskState));
                },
                (error) => {
                    let errorMsg = this._errorService.handleExceptionAndReturnMessage(error);
                    this.alertConfig = this._alertService.retrieveErrorAlertShowConfig(errorMsg);
                });
    }

    deleteTask(task: Task) {
        let taskTitle = JSON.stringify(task.title);
        this._taskService.deleteTask(task)
            .subscribe(
                (success) => {
                    this.tasksChanged.emit();
                    this.alertConfig = this._alertService.retrieveSuccessAlertShowConfig('Task ' + taskTitle + ' removed successfully');
                },
                (error) => {
                    let errorMsg = this._errorService.handleExceptionAndReturnMessage(error);
                    this.alertConfig = this._alertService.retrieveErrorAlertShowConfig(errorMsg);
                }
            );
    }

    openSpendingTimeModal(content, task: Task) {
        this.spendTimeVal = task.spendTime;
        this.currentTaskTitle = task.title;
        let taskTitle = task.title;
        this._modalService.open(content).result.then((result) => {
                task.spendTime = result;
                this._taskService.editTaskTimeSpend(task).subscribe((result) => {
                        this.alertConfig = this._alertService.retrieveSuccessAlertShowConfig('Time spend on task: "' + taskTitle + '" was successfully changed');
                    },
                    (error) => {
                        let errorMsg = this._errorService.handleExceptionAndReturnMessage(error);
                        this.alertConfig = this._alertService.retrieveErrorAlertShowConfig(errorMsg);
                    });
                this.tasksChanged.emit();
                this._resetSpendTimeValues();
            },
            (dismiss) => {
                this._resetSpendTimeValues();
            });
    }

    changeDeadline(task: Task) {
        let taskTitle = JSON.stringify(task.title);

        this._taskService.editTask(task)
            .subscribe(
                (success) => {
                    this.alertConfig = this._alertService.retrieveSuccessAlertShowConfig('Dead line of task: ' + taskTitle + ' changed.');
                },
                (error) => {
                    let errorMsg = this._errorService.handleExceptionAndReturnMessage(error);
                    this.alertConfig = this._alertService.retrieveErrorAlertShowConfig(errorMsg);
                }
            );
    }

    _resetSpendTimeValues() {
        this.spendTimeVal = 0;
        this.spendTimeDismissEnable = true;
        this.currentTaskTitle = '';
    }
}
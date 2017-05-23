import {Component, Input, Output, EventEmitter} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../../url.constants";
import {TaskService} from "../../../services/TaskService";
import {Task} from "../../../model/Task";
import {TaskState} from "../../../model/TaskState";
import {AlertService} from "../../../services/AlertService";
import {AlertConfig} from "../../../model/alert/AlertConfig";
import {ErrorService} from "../../../services/ErrorService";
import {TaskUtils} from "../../../utils/task.utils";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'kanban-board',
    providers: [TaskService, AlertService, ErrorService, NgbModal],
    templateUrl: URL_COMPONENT_BASE + 'browse/kanban-board/kanban-board.component.html'
//
})
export class KanbanBoardComponent {
    @Input('boardTasks') boardTasks: Array<Task>;
    @Input('editable') editable: boolean = true;
    @Output('tasksChanged') tasksChanged: EventEmitter<any> = new EventEmitter();

    //pipes
    newTaskState = TaskState.NEW;
    inProgressTaskState = TaskState.IN_PROGRESS;
    finishedTaskState = TaskState.FINISHED;

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

    changeTaskState(event, taskState) {
        let task: Task = event.dragData as Task;
        task.state = taskState;
        let taskTitle = task.title;
        this._taskService.editTaskState(task)
            .subscribe(
                (success) => {
                    this.tasksChanged.emit();
                    this.alertConfig = this._alertService.retrieveSuccessAlertShowConfig('State of task "' + taskTitle + '" change to: ' + TaskUtils.statePrettyPrint(taskState));
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
                        this.alertConfig = this._alertService.retrieveSuccessAlertShowConfig('Change time spend on task: "' + taskTitle + '"');
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

    changeTaskStateAndChangeTimeSpend(event, taskState, content) {
        this.spendTimeDismissEnable = false;
        this.openSpendingTimeModal(content, event.dragData as Task);
        this.changeTaskState(event, taskState);
    }

    _resetSpendTimeValues() {
        this.spendTimeVal = 0;
        this.spendTimeDismissEnable = true;
        this.currentTaskTitle = '';
    }

}
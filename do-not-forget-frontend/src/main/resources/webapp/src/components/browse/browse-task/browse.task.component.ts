import {Component} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../../url.constants";
import {TaskService} from "../../../services/TaskService";
import {Task} from "../../../model/Task";
import {TaskState} from "../../../model/TaskState";
import {AlertService} from "../../../services/AlertService";
import {AlertConfig} from "../../../model/alert/AlertConfig";
import {ErrorService} from "../../../services/ErrorService";
import {Router} from "@angular/router";
import {TaskUtils} from "../../../utils/task.utils";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../../services/UserService";

@Component({
    selector: 'browse-tasks',
    providers: [TaskService, AlertService, ErrorService, NgbModal, UserService],
    templateUrl: URL_COMPONENT_BASE + 'browse/browse-task/browse.task.component.html'
//
})
export class BrowseTasksComponent {
    tasks: Array<Task>;
    recentlyExpiredTasks: Array<Task>;

    expiredTaskAmount:number = 0;
    alertConfig: AlertConfig = AlertConfig.getAlertToClose();
    newTaskState = TaskState.NEW;
    inProgressTaskState = TaskState.IN_PROGRESS;
    finishedTaskState = TaskState.FINISHED;
    currentTaskFilterString = "";
    historicalTaskFilterString = "";

    constructor(private _taskService: TaskService, private _alertService: AlertService,
                private _errorService: ErrorService, private _router: Router, private _modalService: NgbModal,
                private _userService: UserService) {

    }

    ngOnInit(): void {
        this._loadTasks();
        this._loadRecentlyExpiredTasks()
    }

    private _loadTasks() {
        this._taskService.getAllTasks().subscribe(
            (data) => {
                this.tasks = data;
            },
            (error) => {
                let errorMsg = this._errorService.handleExceptionAndReturnMessage(error);
                this.alertConfig = this._alertService.retrieveErrorAlertShowConfig(errorMsg);
            }
        );
    }

    private _loadRecentlyExpiredTasks() {
        this._taskService.getRecentlyExpiredTasks().subscribe(
            (data) => {
                this.recentlyExpiredTasks = data;
                this._userService.updateLastBrowseTaskDate().subscribe();
                this.expiredTaskAmount = this.recentlyExpiredTasks.length;

            },
            (error) => {
                let errorMsg = this._errorService.handleExceptionAndReturnMessage(error);
                this.alertConfig = this._alertService.retrieveErrorAlertShowConfig(errorMsg);
            }
        );
    }

    deleteTask(task: Task) {
        let taskTitle = JSON.stringify(task.title);
        this._taskService.deleteTask(task)
            .subscribe(
                (success) => {
                    this._loadTasks();
                    this.alertConfig = this._alertService.retrieveSuccessAlertShowConfig('Task ' + taskTitle + ' removed successfully');
                },
                (error) => {
                    let errorMsg = this._errorService.handleExceptionAndReturnMessage(error);
                    this.alertConfig = this._alertService.retrieveErrorAlertShowConfig(errorMsg);
                }
            );
    }

    editTask(task: Task) {
        this._router.navigate(['authorized/editTask/' + task.id])
    }

    getHistoricalTasks(): Task[] {
        if (!this.tasks) return [];
        return this.tasks.filter(task => TaskUtils.isHistoricalTask(task));
    }

    getCurrentTasks(): Task[] {
        if (!this.tasks) return [];
        return this.tasks.filter(task => TaskUtils.isCurrentTask(task))
    }

    changeTaskState(event, taskState) {
        let task: Task = event.dragData as Task;
        task.state = taskState;
        let taskTitle = task.title;
        this._taskService.editTaskState(task)
            .subscribe(
                (success) => {
                    this._loadTasks();
                    this.alertConfig = this._alertService.retrieveSuccessAlertShowConfig('State of task "' + taskTitle + '" change to: ' + TaskUtils.statePrettyPrint(taskState));
                },
                (error) => {
                    let errorMsg = this._errorService.handleExceptionAndReturnMessage(error);
                    this.alertConfig = this._alertService.retrieveErrorAlertShowConfig(errorMsg);
                });
    }

    currentTasksPresent() {
        return this.getCurrentTasks().length != 0;
    }

    historicalTasksPresent() {
        return this.getHistoricalTasks().length != 0;
    }

    openModal(content) {
        this._modalService.open(content).result.then((result) => {
            this._loadTasks()
            this.expiredTaskAmount = this.recentlyExpiredTasks.length
        });
    }
}
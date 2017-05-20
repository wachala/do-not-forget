import {Component, Input} from "@angular/core";
import {TaskService} from "../../services/TaskService";
import {UserService} from "../../services/UserService";
import {URL_COMPONENT_BASE} from "../../url.constants";
import {ErrorService} from "../../services/ErrorService";
import {AlertService} from "../../services/AlertService";
import {Task} from "../../model/Task";
import {AlertConfig} from "../../model/alert/AlertConfig";

@Component({
    selector: 'expired-tasks-list',
    providers: [TaskService, AlertService, ErrorService, UserService],
    templateUrl: URL_COMPONENT_BASE + 'expired-tasks/expired-tasks.component.html'
//
})
export class ExpiredTasksComponent {
    @Input('expired-tasks') expiredTasks: Array<Task>;
    alertConfig: AlertConfig = AlertConfig.getAlertToClose();

    constructor(private _taskService: TaskService,
                private _alertService: AlertService,
                private _errorService: ErrorService,
                private _userService: UserService) {

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

    removeTask(task: Task) {
        let taskTitle = JSON.stringify(task.title);
        this._taskService.deleteTask(task)
            .subscribe(
                (success) => {
                    let i = this.expiredTasks.indexOf(task);
                    this.expiredTasks.splice(i, 1);
                    this.alertConfig = this._alertService.retrieveSuccessAlertShowConfig('Task ' + taskTitle + ' removed successfully');
                },
                (error) => {
                    let errorMsg = this._errorService.handleExceptionAndReturnMessage(error);
                    this.alertConfig = this._alertService.retrieveErrorAlertShowConfig(errorMsg);
                }
            );
    }


}
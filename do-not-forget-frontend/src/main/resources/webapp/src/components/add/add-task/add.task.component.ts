import {Component} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../../url.constants";
import {Task} from "../../../model/Task";
import {TaskService} from "../../../services/TaskService";
import {AlertService} from "../../../services/AlertService";
import {AlertConfig} from "../../../model/alert/AlertConfig";
import {ErrorService} from "../../../services/ErrorService";
@Component({
    selector: 'add-task',
    providers: [TaskService, AlertService, ErrorService],
    templateUrl: URL_COMPONENT_BASE + 'add/add-task/add.task.component.html'
//
})
export class AddTaskComponent {
    task: Task = new Task();
    alertConfig: AlertConfig = AlertConfig.getAlertToClose();

    constructor(private _taskService: TaskService, private _alertService: AlertService,
                private _errorService: ErrorService) {
    }

    addTask(task:Task) {
        let taskTitle = task.title;

        this._taskService.saveTask(this.task)
            .subscribe(
                (success) => {
                    this.task = new Task();
                    this.alertConfig = this._alertService.retrieveSuccessAlertShowConfig('Task ' + taskTitle + ' added successfully.');
                },
                (error) => {
                    let errorMsg = this._errorService.handleExceptionAndReturnMessage(error);
                    this.alertConfig = this._alertService.retrieveErrorAlertShowConfig(errorMsg);
                }
            );
    }

}
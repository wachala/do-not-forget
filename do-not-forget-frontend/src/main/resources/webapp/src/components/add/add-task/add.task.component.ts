import {Component} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../../url.constants";
import {Task} from "../../../model/Task";
import {TaskService} from "../../../services/TaskService";
import {AlertService} from "../../../services/AlertService";
import {AlertConfig} from "../../../model/alert/AlertConfig";
import {ErrorService} from "../../../services/ErrorService";
import {PriorityProvider} from "../../../providers/priority.provider";
@Component({
    selector: 'add-task',
    providers: [TaskService, AlertService, ErrorService],
    templateUrl: URL_COMPONENT_BASE + 'add/add-task/add.task.component.html'
//
})
export class AddTaskComponent {
    task: Task = new Task();
    alertConfig: AlertConfig = AlertConfig.getAlertToClose();
    priorityProvider: PriorityProvider = new PriorityProvider();

    constructor(private _taskService: TaskService, private _alertService: AlertService,
                private _errorService: ErrorService) {
    }

    estimatedTimePrediction() {
        if (this.task.title) {
            this._taskService.predictTime(this.task.title)
                .subscribe(data => this.task.estimateTime = data);
        }
        else {
            this.task.estimateTime = 0;
        }
    };

    addTask() {
        let taskTitle = this.task.title;

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
import {Component} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../../url.constants";
import {TaskService} from "../../../services/TaskService";
import {Task} from "../../../model/Task";
import {AlertService} from "../../../services/AlertService";
import {AlertConfig} from "../../../model/alert/AlertConfig";
import {ErrorService} from "../../../services/ErrorService";
import {Router} from "@angular/router";
import {DateValidationUtils} from "../../../utils/date.validator.utils";

@Component({
    selector: 'browse-tasks',
    providers: [TaskService, AlertService, ErrorService],
    templateUrl: URL_COMPONENT_BASE + 'browse/browse-task/browse.task.component.html'
//
})
export class BrowseTasksComponent {
    tasks;
    alertConfig: AlertConfig = AlertConfig.getAlertToClose();

    constructor(private _taskService: TaskService, private _alertService: AlertService,
                private _errorService: ErrorService, private _router: Router) {

    }

    ngOnInit(): void {
        this._loadTasks();
    }

    private _loadTasks() {
        this._taskService.getAllTasks().subscribe(data => {
                this.tasks = data;
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
                    this.alertConfig = this._alertService.retrieveSuccessAlertShowConfig('Task ' + taskTitle + ' removed');
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

    isHistoricalTask(task: Task) {
        return !DateValidationUtils.isDateInTheFuture(task.deadLine);
    }
}
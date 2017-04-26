import {Component} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../../url.constants";
import {TaskService} from "../../../services/TaskService";
import {Task} from "../../../model/Task";
import {AlertService} from "../../../services/AlertService";
import {AlertConfig} from "../../../model/alert/AlertConfig";
@Component({
    selector: 'browse-tasks',
    providers: [TaskService, AlertService],
    templateUrl: URL_COMPONENT_BASE + 'browse/browse-task/browse.task.component.html'
//
})
export class BrowseTasksComponent {
    tasks;
    alertConfig: AlertConfig = AlertConfig.getAlertToClose();

    constructor(private _taskService: TaskService, private _alertService: AlertService) {

    }

    ngOnInit(): void {
        this._loadTasks();
    }

    private _loadTasks() {
        this._taskService.getAllTasks().subscribe(data => {
            this.tasks = data;
        });
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
                    this.alertConfig = this._alertService.retrieveErrorAlertShowConfig('Something went wrong with removing task, try again');
                }
            );
    }
}
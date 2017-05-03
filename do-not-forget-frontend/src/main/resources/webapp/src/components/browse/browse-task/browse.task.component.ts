import {Component} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../../url.constants";
import {TaskService} from "../../../services/TaskService";
import {Task} from "../../../model/Task";
import {Router} from "@angular/router";
import {DateValidationUtils} from "../../../utils/date.validator.utils";

@Component({
    selector: 'browse-tasks',
    providers: [TaskService],
    templateUrl: URL_COMPONENT_BASE + 'browse/browse-task/browse.task.component.html'
//
})
export class BrowseTasksComponent {
    tasks;

    constructor(private _taskService: TaskService, private _router: Router) {

    }

    ngOnInit(): void {
        this._loadTasks();
    }

    private _loadTasks() {
        this._taskService.getAllTasks().subscribe(data => {
            this.tasks = data
        });
    }

    deleteTask(task: Task) {
        this._taskService.deleteTask(task)
            .subscribe(
                (result) => this._loadTasks()
            );
    }

    editTask(task: Task) {
        this._router.navigate(['authorized/editTask/' + task.id])
    }

    isHistoricalTask(task: Task) {
        return !DateValidationUtils.isDateInTheFuture(task.deadLine);
    }
}
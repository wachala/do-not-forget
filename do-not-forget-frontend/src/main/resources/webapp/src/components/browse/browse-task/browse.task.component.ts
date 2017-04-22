import {Component} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../../url.constants";
import {TaskService} from "../../../services/TaskService";
import {Task} from "../../../model/Task";
@Component({
    selector: 'browse-tasks',
    providers: [TaskService],
    templateUrl: URL_COMPONENT_BASE + 'browse/browse-task/browse.task.component.html'
//
})
export class BrowseTasksComponent {
    tasks;

    constructor(private _taskService: TaskService) {

    }

    ngOnInit(): void {
        this._loadTasks();
    }

    private _loadTasks() {
        this._taskService.getAllTasks().subscribe(data => {
            this.tasks = data;
            console.log(data);
        });
    }

    deleteTask(task: Task) {
        this._taskService.deleteTask(task)
            .subscribe(
                (result) => this._loadTasks()
            );
    }
}
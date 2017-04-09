import {Component} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../../url.constants";
import {Task} from "../../../model/Task";
import {TaskService} from "../../../services/TaskService";
@Component({
    selector: 'add-task',
    providers: [TaskService],
    templateUrl: URL_COMPONENT_BASE + 'add/add-task/add.task.component.html'
//
})
export class AddTaskComponent {
    task: Task = new Task();

    constructor(private _taskService: TaskService) {
    }

    addTask() {
        this._taskService.saveTask(this.task);
        this.task = new Task();
    }
}
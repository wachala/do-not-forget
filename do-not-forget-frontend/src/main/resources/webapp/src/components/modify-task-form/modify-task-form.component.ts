import {Component, Input, EventEmitter, Output} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../url.constants";
import {ErrorService} from "../../services/ErrorService";
import {AlertService} from "../../services/AlertService";
import {Task} from "../../model/Task";
import {TaskService} from "../../services/TaskService";
import {PriorityProvider} from "../../providers/priority.provider";
@Component({
    selector: 'task-form',
    providers: [ErrorService,
        AlertService],
    templateUrl: URL_COMPONENT_BASE + 'modify-task-form/modify-task-form.component.html'
})
export class ModifyTaskFormComponent {
    @Input('task-model') task: Task = new Task();
    @Input('form-name') formName: string = '';
    @Input('discard-enable') discardEnable: boolean = true;
    @Output('confirm-clicked') confirmClicked: EventEmitter<Task> = new EventEmitter();
    @Output('discard-clicked') discardClicked: EventEmitter<any> = new EventEmitter();

    priorityProvider: PriorityProvider = new PriorityProvider();


    constructor(private _taskService: TaskService) {

    }

    confirm() {
        this.confirmClicked.emit(JSON.parse(JSON.stringify(this.task)));
    }

    discard() {
        this.discardClicked.emit();
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
}
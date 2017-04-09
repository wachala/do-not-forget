import {Component, Input} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../../url.constants";
import {Task} from "../../../model/Task";
@Component({
    selector: 'add-task-form',
    templateUrl: URL_COMPONENT_BASE + 'add/add-task-form/add-task-form.component.html'
//
})
export class AddTaskFormComponent {

    @Input('task') task:Task;
}

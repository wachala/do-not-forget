import {Component} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../url.constants";
import {TaskService} from "../../services/TaskService";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'edit-view',
    providers: [TaskService],
    templateUrl: URL_COMPONENT_BASE + 'edit/edit.component.html'
})

export class EditTaskComponent {
    task;
    errorText;

    constructor(private _taskService: TaskService, private _route: ActivatedRoute, private _router: Router) {

    }

    ngOnInit(): void {
        this._taskService.getTaskById(this._route.snapshot.params['id'])
            .subscribe(
                data => {
                    this.task = data;
                },
                err => {
                    this.errorText = err;
                });
    }

    cancel(): void {
        this._router.navigate(['authorized/browseTasks']);
    }

    save(): void {
        this._taskService.editTask(this.task).subscribe(
            () => this._router.navigate(['authorized/browseTasks'])
        );
    }
}

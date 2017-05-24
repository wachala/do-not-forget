import {Component} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../url.constants";
import {TaskService} from "../../services/TaskService";
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorService} from "../../services/ErrorService";
import {AlertService} from "../../services/AlertService";
import {AlertConfig} from "../../model/alert/AlertConfig";
import {PriorityProvider} from "../../providers/priority.provider";
import {Task} from "../../model/Task";

@Component({
    selector: 'edit-view',
    providers: [TaskService, AlertService, ErrorService],
    templateUrl: URL_COMPONENT_BASE + 'edit/edit.component.html'
})

export class EditTaskComponent {
    task: Task;
    alertConfig: AlertConfig = AlertConfig.getAlertToClose();

    constructor(private _taskService: TaskService,
                private _route: ActivatedRoute,
                private _router: Router,
                private _alertService: AlertService,
                private _errorService: ErrorService) {

    }

    ngOnInit(): void {
        this._taskService.getTaskById(this._route.snapshot.params['id'])
            .subscribe(
                data => {
                    this.task = data;
                },
                (error) => {
                    let errorMsg = this._errorService.handleExceptionAndReturnMessage(error);
                    this.alertConfig = this._alertService.retrieveErrorAlertShowConfig(errorMsg);
                });
    }

    cancel(event): void {
        this._router.navigate(['authorized/browseTasks']);
    }

    save(task: Task): void {
        console.log(task);
        this._taskService.editTask(task).subscribe(
            () => {
                this.alertConfig = this._alertService
                    .retrieveSuccessAlertShowConfig('Task \'' + task.title + '\' saved!');
            }
        );
    }

    onAlertClose($event) {
        this.alertConfig.show = false;
        this._router.navigate(['authorized/browseTasks']);
    }
}

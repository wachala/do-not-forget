import {Component} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../url.constants";
import {TaskService} from "../../services/TaskService";
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorService} from "../../services/ErrorService";
import {AlertService} from "../../services/AlertService";
import {AlertConfig} from "../../model/alert/AlertConfig";
import {TaskUtils} from "../../utils/task.utils";
import {CustomDate} from "../../model/CustomDate";
import {CustomDateAndDateConverter} from "../../converters/CustomDateAndDateConverter";

@Component({
    selector: 'edit-view',
    providers: [TaskService, AlertService, ErrorService],
    templateUrl: URL_COMPONENT_BASE + 'edit/edit.component.html'
})

export class EditTaskComponent {
    task;
    alertConfig: AlertConfig = AlertConfig.getAlertToClose();
    customDateDeadline = new CustomDate;

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
                    this.customDateDeadline = CustomDateAndDateConverter.toCustomDate(this.task.deadLine);
                    console.log(this.customDateDeadline);
                },
                (error) => {
                    let errorMsg = this._errorService.handleExceptionAndReturnMessage(error);
                    this.alertConfig = this._alertService.retrieveErrorAlertShowConfig(errorMsg);
                });
    }

    cancel(): void {
        this._router.navigate(['authorized/browseTasks']);
    }

    save(): void {
        this.task.deadLine = CustomDateAndDateConverter.toDate(this.customDateDeadline);
        console.log(this.customDateDeadline);
        console.log(this.task);
        this._taskService.editTask(this.task).subscribe(
            () => {
                this.alertConfig = this._alertService
                    .retrieveSuccessAlertShowConfig('Task \'' + this.task.title + '\' saved!');
            }
        );
    }

    onAlertClose ($event) {
        this.alertConfig.show = false;
        this._router.navigate(['authorized/browseTasks']);
    }
}

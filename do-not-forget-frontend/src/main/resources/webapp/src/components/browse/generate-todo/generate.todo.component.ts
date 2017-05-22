import {Component} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../../url.constants";
import {TodoGeneratorService} from "../../../services/TodoGeneratorService";
import {Task} from "../../../model/Task";
import {ErrorService} from "../../../services/ErrorService";
import {AlertService} from "../../../services/AlertService";
import {AlertConfig} from "../../../model/alert/AlertConfig";

@Component({
    selector: 'generate-todo',
    providers: [TodoGeneratorService, ErrorService],
    templateUrl: URL_COMPONENT_BASE + 'browse/generate-todo/generate.todo.component.html'
//
})
export class GenerateTodoComponent {
    timeAvailable: number = 0;
    strategy: number = 0;
    todoList: Array<Task>;
    alertConfig: AlertConfig = AlertConfig.getAlertToClose();

    constructor(private todoService: TodoGeneratorService, private errorService: ErrorService,
                private alertService: AlertService) {
        this.loadPreviouslyGeneratedTodoList();
    }

    loadPreviouslyGeneratedTodoList() {
        this.todoService.loadPrevoiuslyGeneratedList().subscribe(
            data => {
                this.todoList = data.tasksTodo;
                this.timeAvailable = data.timeAvailable;
                this.strategy = data.strategy;
            },
            error => {
                let errorMsg = this.errorService.handleExceptionAndReturnMessage(error);
                this.alertConfig = this.alertService.retrieveErrorAlertShowConfig(errorMsg);
            }
        );
    }

    generateTodoList() {
        this.todoService.generateTodoList(this.strategy, this.timeAvailable).subscribe(
            data => this.todoList = data,
            error => {
                let errorMsg = this.errorService.handleExceptionAndReturnMessage(error);
                this.alertConfig = this.alertService.retrieveErrorAlertShowConfig(errorMsg);
            }
        );
    }

}
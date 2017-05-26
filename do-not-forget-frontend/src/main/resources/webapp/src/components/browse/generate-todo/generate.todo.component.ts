import {Component} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../../url.constants";
import {TodoGeneratorService} from "../../../services/TodoGeneratorService";
import {Task} from "../../../model/Task";
import {ErrorService} from "../../../services/ErrorService";
import {AlertService} from "../../../services/AlertService";
import {AlertConfig} from "../../../model/alert/AlertConfig";
import {GeneratorData} from "../../../model/generator/GeneratorData";

@Component({
    selector: 'generate-todo',
    providers: [TodoGeneratorService, ErrorService, AlertService],
    templateUrl: URL_COMPONENT_BASE + 'browse/generate-todo/generate.todo.component.html'
//
})
export class GenerateTodoComponent {
    generatorData: GeneratorData = new GeneratorData();
    todoList: Array<Task>;
    alertConfig: AlertConfig = AlertConfig.getAlertToClose();
    previousListAvailable: boolean = false;
    listGenerated: boolean = false;

    constructor(private todoService: TodoGeneratorService, private errorService: ErrorService,
                private alertService: AlertService) {
    }

    ngOnInit(): void {
        this._loadPreviouslyGeneratedTodoList();
    }

    _loadPreviouslyGeneratedTodoList() {
        this.todoService.loadPrevoiuslyGeneratedList().subscribe(
            data => {
                console.log(JSON.stringify(data));

                this.todoList = data.tasksTodo;
                if(data.generatorData) {
                    this.generatorData = data.generatorData;
                }
                this.previousListAvailable = true;
            },
            error => {
                this.todoList = [];
                this.previousListAvailable = false;
            }
        );
    }

    generateTodoList($event) {
        this.todoService.generateTodoList(this.generatorData).subscribe(
            data => {
                this.todoList = data;
                this.previousListAvailable = false;
                this.listGenerated = true;
            },
            error => {
                let errorMsg = this.errorService.handleExceptionAndReturnMessage(error);
                this.alertConfig = this.alertService.retrieveErrorAlertShowConfig(errorMsg);
            }
        );
    }

    generatedTaskAvailable() {
        return this.todoList && this.todoList.length > 0;
    }

    reloadTasks($event) {
        this._loadPreviouslyGeneratedTodoList();
    }

}
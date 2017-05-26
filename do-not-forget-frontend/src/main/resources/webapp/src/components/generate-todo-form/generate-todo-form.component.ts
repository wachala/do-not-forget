import {Component, Input, EventEmitter, Output} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../url.constants";
import {Task} from "../../model/Task";
import {GeneratorStrategyProvider} from "../../providers/strategy.provider";
import {GeneratorData} from "../../model/generator/GeneratorData";

@Component({
    selector: 'generate-todo-form',
    providers: [,],
    templateUrl: URL_COMPONENT_BASE + 'generate-todo-form/generate-todo-form.component.html'
})
export class GenerateTodoFormComponent {
    @Input('generator-data') generatorData: GeneratorData = new GeneratorData();
    @Output('generate-todo') generateTodoList: EventEmitter<Task> = new EventEmitter();

    strategyProvider: GeneratorStrategyProvider = new GeneratorStrategyProvider();

    generateTodoListClicked() {
        this.generateTodoList.emit();
    }
}
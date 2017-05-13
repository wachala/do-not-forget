import {Pipe, PipeTransform} from "@angular/core";
import {Task} from "../model/Task";

@Pipe({name: 'containsStringFilterPipe'})
export class ContainsStringFilterPipe implements PipeTransform {
    transform(tasks: Task[], str : string): Task[] {
        return tasks ? tasks.filter(task =>
            this.containsString(task.title, str) || this.containsString(task.description, str)) : tasks;
    }

    private containsString(text: string, str : string){
        return text && text.toLowerCase().indexOf(str.toLowerCase()) >=0;
    }
}
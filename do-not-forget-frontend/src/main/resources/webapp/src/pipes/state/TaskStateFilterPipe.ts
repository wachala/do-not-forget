import {Pipe, PipeTransform} from "@angular/core";
import {Task} from "../../model/Task";

@Pipe({name: 'taskStateFilter'})
export class TaskStateFilterPipe implements PipeTransform {
    transform(items: Task[], type: string): Task[] {
        if(!items || !type) {
            return items;
        }

        return items.filter(item => item.state === type)
    }
}
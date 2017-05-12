import {Pipe, PipeTransform} from "@angular/core";
import {Task} from "../../model/Task";

@Pipe({name: 'taskStateFilter'})
export class TaskStateFilterPipe implements PipeTransform {
    transform(tasks: Task[], type: string): Task[] {
        return tasks && type ? tasks.filter(task => task.state === type) : tasks;
    }
}
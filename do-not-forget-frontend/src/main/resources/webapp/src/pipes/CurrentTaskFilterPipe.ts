import {Pipe, PipeTransform} from "@angular/core";
import {TaskUtils} from "../utils/task.utils";
import {Task} from "../model/Task";

@Pipe({name: 'currentTaskFilter'})
export class CurrentTaskFilterPipe implements PipeTransform {
    transform(tasks: Task[]): Task[] {
        if(!tasks) {
            return tasks;
        }

        return tasks.filter(task => TaskUtils.isCurrentTask(task))
    }
}
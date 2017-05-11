import {Pipe, PipeTransform} from "@angular/core";
import {Task} from "../model/Task";
import {TaskUtils} from "../utils/task.utils";

@Pipe({name: 'historicalTaskFilter'})
export class HistoricalTaskFilterPipe implements PipeTransform {
    transform(tasks: Task[]): Task[] {
        if(!tasks) {
            return tasks;
        }

        return tasks.filter(task => TaskUtils.isHistoricalTask(task))
    }
}
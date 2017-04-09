import {TaskState} from "./TaskState";
import {CustomDate} from "./CustomDate";
export class Task {
    id: string;
    estimateTime: number = 0;
    spendTime: number = 0;
    deadLine: CustomDate = new CustomDate;
    addedDate: CustomDate = new CustomDate;
    priority: number = 0;
    title: string = '';
    description: string = '';
    state: TaskState = TaskState.NEW;
}
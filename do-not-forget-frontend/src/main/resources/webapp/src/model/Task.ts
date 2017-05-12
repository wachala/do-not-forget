import {TaskState} from "./TaskState";
import {CustomDate} from "./CustomDate";
export class Task {
    id: string;
    estimateTime: number = 0;
    spendTime: number = 0;
    deadLine: CustomDate = {day: new Date().getDate(), month: new Date().getMonth() + 1, year: new Date().getFullYear()};
    addedDate: CustomDate = new CustomDate;
    priority: number = 0;
    title: string = 'Something to do..';
    description: string = '';
    state: string = TaskState.NEW;
}
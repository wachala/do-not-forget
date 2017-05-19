import {TaskState} from "./TaskState";
import {CustomDate} from "./CustomDate";
import {PriorityProvider} from "../providers/priority.provider";
export class Task {
    id: string;
    estimateTime: number = 0;
    spendTime: number = 0;
    deadLine: CustomDate = {day: new Date().getDate(), month: new Date().getMonth() + 1, year: new Date().getFullYear()};
    addedDate: CustomDate = new CustomDate;
    priority: number = new PriorityProvider().retrieveDefaultPriorityIndex();
    title: string = 'Something to do..';
    description: string = '';
    state: string = TaskState.NEW;
}
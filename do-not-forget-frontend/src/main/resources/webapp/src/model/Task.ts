import {TaskState} from "./TaskState";
import {CustomDate} from "./CustomDate";
import {DateUtils} from "../utils/date.utils";
export class Task {
    id: string;
    estimateTime: number = 0;
    spendTime: number = 0;
    deadLine: Date = DateUtils.getNextMonth();
    addedDate: Date = new Date;
    priority: number = 0;
    title: string = 'Something to do..';
    description: string = '';
    state: string = TaskState.NEW;
}
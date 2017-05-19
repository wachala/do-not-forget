import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {
    BASE_URL, ADD_TASK_URL, GET_TASKS_URL, DELETE_TASK_URL, EDIT_TASK_URL, EDIT_TASK_STATE_URL,
    GET_RECENTLY_EXPIRED_TASKS_URL
} from "./config";
import {Task} from "../model/Task";
import {HttpService} from "./HttpService";
@Injectable()
export class TaskService {
    constructor(private http: HttpService) {
    }

    saveTask(task: Task) {
        let body = JSON.stringify(task);

        return this.http.post(BASE_URL, ADD_TASK_URL, body)
            .map((res: Response) => res.json());
    }

    getAllTasks() {
        return this.http.get(BASE_URL, GET_TASKS_URL).map((res: Response) => res.json());
    }

    deleteTask(task) {
        let body = JSON.stringify(task);

        return this.http.put(BASE_URL, DELETE_TASK_URL, body)
            .map((res: Response) => res.json());
    }

    getTaskById(id) {
        return this.http.get(BASE_URL, GET_TASKS_URL + id)
            .map((res: Response) => res.json());
    }

    editTask(task) {
        let body = JSON.stringify(task);

        return this.http.put(BASE_URL, EDIT_TASK_URL, body)
            .map((res: Response) => {
                res.json()
            });
    }

    editTaskState(task) {
        let body = JSON.stringify(task);

        return this.http.put(BASE_URL, EDIT_TASK_STATE_URL, body)
            .map((res: Response) => {
                res.json()
            });
    }

    predictTime(title) {
        return this.http.get(BASE_URL, PREDICT_TIME_URL + '?pattern=' + title).map((res: Response) => res.json())
    }

    editTaskTimeSpend(task: Task) {
        let body = JSON.stringify(task);

        return this.http.put(BASE_URL, EDIT_TASK_TIME_SPEND_URL, body);
    }

    getRecentlyExpiredTasks() {
        return this.http.get(BASE_URL, GET_RECENTLY_EXPIRED_TASKS_URL)
            .map((res: Response) => res.json());
    }
}
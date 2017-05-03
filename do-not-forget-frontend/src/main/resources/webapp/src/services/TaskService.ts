import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {BASE_URL, ADD_TASK_URL, GET_TASKS_URL, DELETE_TASK_URL, EDIT_TASK_URL} from "./config";
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
            .map((res: Response) => {
                if(res.status < 200 || res.status >= 300) {
                    throw new Error('This request has failed ' + res.status);
                }
                else {
                    return res.json();
                }
            });
    }

    editTask(task) {
        let body = JSON.stringify(task);

        return this.http.put(BASE_URL, EDIT_TASK_URL, body)
            .map((res: Response) => {
                res.json()
            });
    }
}
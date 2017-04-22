import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {BASE_URL} from "./config";
import {Task} from "../model/Task";
import {HttpService} from "./HttpService";
@Injectable()
export class TaskService {
    constructor(private http: HttpService) {
    }

    saveTask(task: Task) {
        let body = JSON.stringify(task);

        return this.http.post(BASE_URL + 'task/add', body)
            .map((res: Response) => res.json());
    }

    getAllTasks() {
        return this.http.get(BASE_URL + 'task/').map((res: Response) => {
                    res.json();
            }
        );
    }

    deleteTask(task) {
        let body = JSON.stringify(task);

        return this.http.put(BASE_URL + 'task/delete', body)
            .map((res: Response) => res.json());
    }
}
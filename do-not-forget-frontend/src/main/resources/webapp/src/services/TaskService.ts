import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {BASE_URL} from "./config";
import {Task} from "../model/Task";
@Injectable()
export class TaskService {
    constructor(private http: Http) {
    }

    saveTask(task: Task) {
        let body = JSON.stringify(task);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(BASE_URL+'task/add', body, options)
            .map((res:Response) => res.json());
    }

    getAllTasks() {
        return this.http.get(BASE_URL + 'task/').map((res:Response) => res.json());
    }

    deleteTask(task) {
        let body = JSON.stringify(task);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(BASE_URL+'task/delete', body, options)
            .map((res:Response) => res.json());
    }
}
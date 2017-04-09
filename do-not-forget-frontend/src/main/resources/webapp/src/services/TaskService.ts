import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {BASE_URL} from "./config";
import {Observable} from "rxjs";
import {Task} from "../model/Task";
@Injectable()
export class TaskService {
    constructor(private http: Http) {
    }

    saveTask(task: Task) {
        console.log(task);
        let body = JSON.stringify(task);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        this.http.post(BASE_URL+'task/add', body, options)
            .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
            .subscribe(
                response => console.log(response),
                () => console.log('Complete')
            );
    }
}
import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {BASE_URL, GET_GENERATED_TODO_LIST, GET_PREVIOUSLY_GENERATED_TODO_LIST} from "./config";
import {HttpService} from "./HttpService";

@Injectable()
export class TodoGeneratorService {
    constructor(private http: HttpService) {
    }

    loadPrevoiuslyGeneratedList() {
        return this.http.get(BASE_URL, GET_PREVIOUSLY_GENERATED_TODO_LIST)
            .map((res: Response) => res.json());
    }

    generateTodoList(strategy, timeAvailable) {
        //TODO add strategy and timeAvailable as request params

        return this.http.get(BASE_URL, GET_GENERATED_TODO_LIST)
            .map((res: Response) => res.json());
    }

}
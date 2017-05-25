import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {BASE_URL, GET_GENERATED_TODO_LIST, GET_PREVIOUSLY_GENERATED_TODO_LIST} from "./config";
import {HttpService} from "./HttpService";
import {GeneratorData} from "../model/generator/GeneratorData";

@Injectable()
export class TodoGeneratorService {
    constructor(private http: HttpService) {
    }

    loadPrevoiuslyGeneratedList() {
        return this.http.get(BASE_URL, GET_PREVIOUSLY_GENERATED_TODO_LIST)
            .map((res: Response) => res.json());
    }

    generateTodoList(generatorData: GeneratorData) {
        let ednpointUrl = GET_GENERATED_TODO_LIST + "?strategy=" + generatorData.strategy +"&timeAvailable=" + generatorData.timeAvailable;

        return this.http.get(BASE_URL, ednpointUrl)
            .map((res: Response) => res.json());
    }

}
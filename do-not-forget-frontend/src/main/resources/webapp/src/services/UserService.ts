import {Injectable} from "@angular/core";
import {HttpService} from "./HttpService";
import {BASE_URL, RETRIEVE_USER_DATA_URL, UPDATE_BROWSE_TASKS_DATE_URL} from "./config";
import {Response} from "@angular/http";
@Injectable()
export class UserService {
    constructor(private http: HttpService) {
    }

    retrieveUserData() {
        return this.http.get(BASE_URL, RETRIEVE_USER_DATA_URL)
            .map((res: Response) => res.json());
    }

    updateLastBrowseTaskDate() {
        return this.http.post(BASE_URL, UPDATE_BROWSE_TASKS_DATE_URL, '');
    }
}
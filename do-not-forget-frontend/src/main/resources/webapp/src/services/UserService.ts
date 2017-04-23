import {Injectable} from "@angular/core";
import {HttpService} from "./HttpService";
import {BASE_URL, RETRIEVE_USER_DATA_URL} from "./config";
import {Response} from "@angular/http";
@Injectable()
export class UserService {
    constructor(private http: HttpService) {
    }

    retrieveUserData() {
        return this.http.get(BASE_URL, RETRIEVE_USER_DATA_URL)
            .map((res: Response) => res.json());
    }

}
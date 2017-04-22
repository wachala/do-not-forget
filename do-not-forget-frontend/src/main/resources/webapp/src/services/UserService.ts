import {Injectable} from "@angular/core";
import {HttpService} from "./HttpService";
import {BASE_URL} from "./config";
import {Response} from "@angular/http";
@Injectable()
export class UserService {
    constructor(private http: HttpService) {
    }

    retrieveUserData() {
        return this.http.get(BASE_URL + 'user')
            .map((res: Response) => res.json());
    }

}
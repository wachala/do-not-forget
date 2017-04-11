import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {BASE_URL} from "./config";
import {LoginData} from "../model/LoginData";
@Injectable()
export class LoginService {
    constructor(private http: Http) {
    }

    loginUser(loginData: LoginData) {
        let body = JSON.stringify(loginData);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(BASE_URL + 'login', body, options)
            .map((res: Response) => res.json());
    }

}
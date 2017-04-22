import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {BASE_URL} from "./config";
import {LoginData} from "../model/LoginData";
import {AUTH_HEADER} from "../auth.constants";
import {HttpService} from "./HttpService";
@Injectable()
export class LoginService {
    constructor(private http: HttpService) {
    }

    loginUser(loginData: LoginData) {
        let body = JSON.stringify(loginData);

        return this.http.post(BASE_URL + 'login', body)
            .map((res: Response) => res.headers.get(AUTH_HEADER));
    }

}
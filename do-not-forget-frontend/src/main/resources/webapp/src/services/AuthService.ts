import {Injectable} from "@angular/core";
import {HttpService} from "./HttpService";
import {BASE_URL} from "./config";
import {AUTH_HEADER, USER} from "../auth.constants";
import {Response} from "@angular/http";

@Injectable()
export class AuthService {
    constructor(private _http: HttpService) {
    }

    isTokenValid(): boolean {
        this._http.get(BASE_URL + 'user')
            .subscribe(
                (success:Response) => {
                    localStorage.setItem(AUTH_HEADER, success.headers.get(AUTH_HEADER));
                    localStorage.setItem(USER, JSON.stringify(success.json()))
                },
                error => {
                    localStorage.clear();
                });

        return !!(localStorage.getItem(AUTH_HEADER) && localStorage.getItem(USER));
    }

}
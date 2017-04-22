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
        return !!(sessionStorage.getItem(AUTH_HEADER) && sessionStorage.getItem(USER));
    }

}
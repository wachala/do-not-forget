import {Injectable} from "@angular/core";
import {HttpService} from "./HttpService";
import {AUTH_HEADER, USER} from "../auth.constants";

@Injectable()
export class AuthService {
    constructor() {
    }

    isTokenValid(): boolean {
        return !!(sessionStorage.getItem(AUTH_HEADER) && sessionStorage.getItem(USER));
    }

}
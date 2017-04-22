import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {BASE_URL} from "./config";
import {HttpService} from "./HttpService";
@Injectable()
export class LogoutService {
    constructor(private http: HttpService) {
    }

    logout() {
        return this.http.get(BASE_URL + 'logout').map((res: Response) => res);
    }

}
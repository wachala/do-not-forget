import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {BASE_URL} from "./config";
import {RegistrationData} from "../model/RegistrationData";
@Injectable()
export class RegistrationService {
    constructor(private http: Http) {
    }

    registerUser(registrationData: RegistrationData) {
        let body = JSON.stringify(registrationData);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(BASE_URL + 'signup', body, options)
            .map((res: Response) => res.json());
    }

}
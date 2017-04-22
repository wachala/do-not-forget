import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {BASE_URL} from "./config";
import {RegistrationData} from "../model/RegistrationData";
import {HttpService} from "./HttpService";
@Injectable()
export class RegistrationService {
    constructor(private http: HttpService) {
    }

    registerUser(registrationData: RegistrationData) {
        let body = JSON.stringify(registrationData);

        return this.http.post(BASE_URL + 'signup', body)
            .map((res: Response) => res.json());
    }

}
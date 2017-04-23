import {Component} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../url.constants";
import {RegistrationData} from "../../model/RegistrationData";
import {RegistrationService} from "../../services/RegistrationService";
@Component({
    selector: 'login-view',
    providers: [RegistrationService],
    templateUrl: URL_COMPONENT_BASE + 'register/register.component.html'
})
export class RegisterComponent {
    constructor(private _registrationService: RegistrationService) {

    }
    registrationData: RegistrationData = new RegistrationData;
    repeatedPassword:string = '';

    register() {
        this._registrationService.registerUser(this.registrationData)
            .subscribe(
                success => {
                    this.registrationData = new RegistrationData;
                    this.repeatedPassword = ''
                }
            );
    }
}
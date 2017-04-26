import {Component} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../url.constants";
import {RegistrationData} from "../../model/RegistrationData";
import {RegistrationService} from "../../services/RegistrationService";
import {AlertService} from "../../services/AlertService";
import {AlertConfig} from "../../model/alert/AlertConfig";
@Component({
    selector: 'login-view',
    providers: [RegistrationService, AlertService],
    templateUrl: URL_COMPONENT_BASE + 'register/register.component.html'
})
export class RegisterComponent {
    alertConfig: AlertConfig = AlertConfig.getAlertToClose();

    constructor(private _registrationService: RegistrationService, private _alertService: AlertService) {
    }

    registrationData: RegistrationData = new RegistrationData;
    repeatedPassword: string = '';

    register() {
        this._registrationService.registerUser(this.registrationData)
            .subscribe(
                success => {
                    console.log('success');
                    this.alertConfig = this._alertService.retrieveSuccessAlertShowConfig('Successfull registration');
                    this.registrationData = new RegistrationData;
                    this.repeatedPassword = '';
                },
                error => {
                    console.log('error');
                    this.alertConfig = this._alertService
                        .retrieveErrorAlertShowConfig('Something went wrong with registration, try again');
                }
            );
    }
}
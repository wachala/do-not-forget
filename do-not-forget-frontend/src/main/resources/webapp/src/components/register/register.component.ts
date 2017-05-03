import {Component} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../url.constants";
import {RegistrationData} from "../../model/RegistrationData";
import {RegistrationService} from "../../services/RegistrationService";
import {AlertService} from "../../services/AlertService";
import {AlertConfig} from "../../model/alert/AlertConfig";
import {ErrorService} from "../../services/ErrorService";
import {Router} from "@angular/router";
import {LoginStateMapService} from "../../services/LoginStateMapService";
import {LOGIN} from "../../navigation.constants";
@Component({
    selector: 'login-view',
    providers: [RegistrationService, AlertService, ErrorService],
    templateUrl: URL_COMPONENT_BASE + 'register/register.component.html'
})
export class RegisterComponent {
    alertConfig: AlertConfig = AlertConfig.getAlertToClose();

    constructor(private _registrationService: RegistrationService, private _alertService: AlertService,
                private _errorService: ErrorService, private _router: Router) {
    }

    registrationData: RegistrationData = new RegistrationData;
    repeatedPassword: string = '';

    register() {
        this._registrationService.registerUser(this.registrationData)
            .subscribe(
                success => {
                    this._router
                        .navigate([LOGIN, LoginStateMapService.REGISTER_SUCCESSFUL_STATE]);
                },
                error => {
                    let errorMsg = this._errorService.handleExceptionAndReturnMessage(error);
                    this.alertConfig = this._alertService
                        .retrieveErrorAlertShowConfig(errorMsg);
                }
            );
    }
}
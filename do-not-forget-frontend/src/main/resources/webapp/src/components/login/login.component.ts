import {Component} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../url.constants";
import {LoginData} from "../../model/LoginData";
import {LoginService} from "../../services/LoginService";
@Component({
    selector: 'login-view',
    providers: [LoginService],
    templateUrl: URL_COMPONENT_BASE + 'login/login.component.html'
})
export class LoginComponent {
    constructor(private _loginService: LoginService) {

    }

    loginData: LoginData = new LoginData;

    login() {
        this._loginService.loginUser(this.loginData)
            .subscribe(success => {
                this.loginData = new LoginData
            });
    }
}
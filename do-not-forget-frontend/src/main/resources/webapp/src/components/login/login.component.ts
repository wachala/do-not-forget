import {Component} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../url.constants";
import {LoginData} from "../../model/LoginData";
@Component({
    selector: 'login-view',
    templateUrl: URL_COMPONENT_BASE + 'login/login.component.html'
})
export class LoginComponent {
    loginData:LoginData = new LoginData;

    login() {
        console.log(this.loginData);
    }
}
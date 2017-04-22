import {Component} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../url.constants";
import {LoginData} from "../../model/LoginData";
import {LoginService} from "../../services/LoginService";
import {AUTH_HEADER, USER} from "../../auth.constants";
import {UserService} from "../../services/UserService";
import {Router} from "@angular/router";
@Component({
    selector: 'login-view',
    providers: [LoginService, UserService],
    templateUrl: URL_COMPONENT_BASE + 'login/login.component.html'
})
export class LoginComponent {
    constructor(private _loginService: LoginService, private _userService: UserService, private _router: Router) {

    }

    loginData: LoginData = new LoginData;

    login() {
        this._loginService.loginUser(this.loginData)
            .subscribe(token => {
                sessionStorage.setItem(AUTH_HEADER, token);
                this._retrieveUserData();
                this.loginData = new LoginData
            });
    }


    private _retrieveUserData() {
        this._userService.retrieveUserData()
            .subscribe(userData => {
                sessionStorage.setItem(USER, JSON.stringify(userData));
                this._router.navigate(['/authorized'])
            })
    }
}
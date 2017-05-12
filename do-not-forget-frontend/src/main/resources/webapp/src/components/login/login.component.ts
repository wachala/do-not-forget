import {Component, OnInit, OnDestroy} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../url.constants";
import {LoginData} from "../../model/LoginData";
import {LoginService} from "../../services/LoginService";
import {AUTH_HEADER, USER} from "../../auth.constants";
import {UserService} from "../../services/UserService";
import {Router, ActivatedRoute} from "@angular/router";
import {ErrorService} from "../../services/ErrorService";
import {AlertService} from "../../services/AlertService";
import {AlertConfig} from "../../model/alert/AlertConfig";
import {LoginStateMapService} from "../../services/LoginStateMapService";
import {AUTHORIZED} from "../../navigation.constants";
@Component({
    selector: 'login-view',
    providers: [LoginService, UserService, ErrorService,
        AlertService, LoginStateMapService],
    templateUrl: URL_COMPONENT_BASE + 'login/login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
    sub: any;
    state: any;
    loginData: LoginData = new LoginData;
    alertConfig: AlertConfig = AlertConfig.getAlertToClose();


    constructor(private _loginService: LoginService, private _userService: UserService,
                private _router: Router, private _errorService: ErrorService,
                private _alertService: AlertService, private _route: ActivatedRoute,
                private _loginStateMapService: LoginStateMapService) {

    }

    login() {
        this._loginService.loginUser(this.loginData)
            .subscribe(token => {
                    sessionStorage.setItem(AUTH_HEADER, token);
                    this._retrieveUserData();
                    this.loginData = new LoginData;
                },
                error => {
                    let errorMsg = this._errorService.handleExceptionAndReturnMessage(error);
                    this.alertConfig = this._alertService.retrieveErrorAlertShowConfig(errorMsg);
                });
    }


    private _retrieveUserData() {
        this._userService.retrieveUserData()
            .subscribe(userData => {
                sessionStorage.setItem(USER, JSON.stringify(userData));
                this._router.navigate([AUTHORIZED]);
            })
    }

    ngOnInit() {
        this.sub = this._route.params.subscribe(params => {
            this.alertConfig = this._loginStateMapService
                .retrieveConfigForState(this.state = params['state']);
        });
    }

    ngOnDestroy() {
        if (this.state) {
            this.state.unsubscribe();
        }
    }

}
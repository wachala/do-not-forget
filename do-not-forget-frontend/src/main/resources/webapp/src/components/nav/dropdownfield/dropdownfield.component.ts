import {Component, Input} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../../url.constants";
import {UserInfo} from "../../../model/user/UserInfo";
import {LogoutService} from "../../../services/LogoutService";
import {Router, ActivatedRoute} from "@angular/router";
@Component({
    selector: 'nav-dropdownfield',
    providers: [LogoutService],
    templateUrl: URL_COMPONENT_BASE + 'nav/dropdownfield/dropdownfield.component.html'
//
})
export class NavDropdownFieldComponent {
    @Input("user-info") userInfo: UserInfo;

    constructor(private _logoutService: LogoutService, private _router: Router) {
    }

    logout() {
        this._logoutService.logout()
            .subscribe(
                success => {
                    sessionStorage.clear();
                    this._router.navigate(['/']);
                }
            );
        sessionStorage.clear();
        this._router.navigate(['/']);
    }
}
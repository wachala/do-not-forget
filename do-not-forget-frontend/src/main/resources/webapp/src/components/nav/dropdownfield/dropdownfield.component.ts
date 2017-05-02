import {Component, Input} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../../url.constants";
import {UserInfo} from "../../../model/user/UserInfo";
import {Router, ActivatedRoute} from "@angular/router";
import {ROOT} from "../../../navigation.constants";
@Component({
    selector: 'nav-dropdownfield',
    templateUrl: URL_COMPONENT_BASE + 'nav/dropdownfield/dropdownfield.component.html'
//
})
export class NavDropdownFieldComponent {
    @Input("user-info") userInfo: UserInfo;

    constructor(private _router: Router) {
    }

    logout() {
        sessionStorage.clear();
        this._router.navigate([ROOT]);
    }
}
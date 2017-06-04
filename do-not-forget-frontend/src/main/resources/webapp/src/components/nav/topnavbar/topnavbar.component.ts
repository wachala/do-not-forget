import {Component, Input} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../../url.constants";
import {NavData} from "../../../model/navbar/NavData";
import {UserInfo} from "../../../model/user/UserInfo";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {ROOT} from "../../../navigation.constants";
@Component({
    selector: 'topnavbar',
    templateUrl: URL_COMPONENT_BASE + 'nav/topnavbar/topnavbar.component.html'
//
})
export class TopNavbarComponent {
    @Input("nav-elements") navElements: Array<NavData> = [];
    @Input("user-info") userInfo: UserInfo;
    isCollapsed = true;

    constructor(private _location: Location, private _router: Router) {

    }

    getClassForNav(navElement: NavData) {
        return navElement.link === this._location.path() ? 'nav-item active ml-3' : 'nav-item  ml-3';
    }

    logout() {
        sessionStorage.clear();
        this._router.navigate([ROOT]);
    }

    expand() {
        console.log("expand");
    }
}

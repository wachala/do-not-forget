import {Component, Input} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../../url.constants";
import {NavData} from "../../../model/navbar/NavData";
import {UserInfo} from "../../../model/user/UserInfo";
@Component({
    selector: 'topnavbar',
    templateUrl: URL_COMPONENT_BASE + 'nav/topnavbar/topnavbar.component.html'
//
})
export class TopNavbarComponent {
    @Input("nav-elements") navElements: Array<NavData> = [];
    @Input("user-info") userInfo: UserInfo;
}

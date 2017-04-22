import {Component} from '@angular/core';
import {URL_COMPONENT_BASE} from "../../url.constants";
import {NavData} from "../../model/navbar/NavData";

@Component({
    selector: 'authorized-main',
    templateUrl: URL_COMPONENT_BASE + 'unauthorized-main/unauthorized-main.component.html'
//

})
export class UnauthorizedMainComponent {
    nonAuthorizedNavElementsList: Array<NavData> = [new NavData("Log in", "/login"), new NavData("Sign up", "/register")]
}

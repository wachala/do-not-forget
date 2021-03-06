import {Component, ViewEncapsulation} from '@angular/core';
import {URL_COMPONENT_BASE} from "../../url.constants";
import {NavData} from "../../model/navbar/NavData";

@Component({
    selector: 'my-app',
    templateUrl: URL_COMPONENT_BASE + 'app/app.component.html'
//

})
export class AppComponent {
    nonAuthorizedNavElementsList: Array<NavData> = [new NavData("Log in", "/login"), new NavData("Sign up", "/register")]
}

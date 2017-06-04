import {Component} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../url.constants";
import {NavData} from "../../model/navbar/NavData";
import {UserInfo} from "../../model/user/UserInfo";
import {USER} from "../../auth.constants";

@Component({
    selector: 'authorized-main',
    templateUrl: URL_COMPONENT_BASE + 'authorized-main/authorized-main.component.html'
//

})
export class AuthorizedMainComponent {
    authorizedNavElementsList: Array<NavData> = [new NavData("Browse tasks", "/authorized/browseTasks"),
        new NavData("Add task", "/authorized/addTask"),
        new NavData("Generate Todo list", "/authorized/generateTodo")];
    userInfo: UserInfo;

    constructor() {
        this.userInfo = JSON.parse(sessionStorage.getItem(USER));
    }

}

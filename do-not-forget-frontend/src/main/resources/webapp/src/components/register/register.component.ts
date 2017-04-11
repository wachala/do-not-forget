import {Component} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../url.constants";
import {RegisterData} from "../../model/RegisterData";
@Component({
    selector: 'login-view',
    templateUrl: URL_COMPONENT_BASE + 'register/register.component.html'
})
export class RegisterComponent {
    registerData: RegisterData = new RegisterData;
    repeatedPassword:string = '';

    register() {
        console.log(this.registerData);
    }
}
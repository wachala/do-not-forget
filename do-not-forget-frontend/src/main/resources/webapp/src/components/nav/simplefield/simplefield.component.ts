import {Component, Input} from "@angular/core";
import {URL_COMPONENT_BASE} from "../../../url.constants";
@Component({
    selector: 'nav-simplefield',
    templateUrl: URL_COMPONENT_BASE + 'nav/simplefield/simplefield.component.html'
//
})
export class NavSimpleFieldComponent {
    @Input('name') name: string = '';
    @Input('link') link: string = '';

}
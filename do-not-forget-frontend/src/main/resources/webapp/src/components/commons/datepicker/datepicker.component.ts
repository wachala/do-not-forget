import {Component, Input, Output} from '@angular/core';
import {URL_COMPONENT_BASE} from "../../../url.constants";
import {EventEmitter} from "events";
import {ControlValueAccessor} from "@angular/forms";

@Component({
    selector: 'datepicker',
    templateUrl: URL_COMPONENT_BASE + 'commons/datepicker/datepicker.component.html'
})
export class DatePickerComponent implements ControlValueAccessor {
    dateValue;

    propagateChange = (_: any) => {};

    writeValue(obj: any): void {
        this.dateValue = obj
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
    }
}

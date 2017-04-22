import {Directive} from '@angular/core';
import {NG_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl} from '@angular/forms';
import {CustomDate} from "../../../model/CustomDate";

// validation function
function isLeapYear(year) {
    return year % 400 || (year % 100 != 0 && year % 4 == 0);
}

function isValidDate(date: CustomDate) {
    let daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (isLeapYear(date.year)) {
        daysInMonths[1] = 29;
    }

    return date.month > 0 && date.month <= 12 && date.day > 0 && date.day <= daysInMonths[date.month - 1];
}

function validateDateInFutureFactory(): ValidatorFn {

    return (control: AbstractControl) => {

        let isValid = false;
        let inputDate: CustomDate = control.value;

        if (inputDate != null && isValidDate(inputDate)) {
            let date: Date = new Date(inputDate.year, inputDate.month - 1, inputDate.day);
            let now: Date = new Date();
            let today: Date = new Date(now.getFullYear(), now.getMonth(), now.getDate());

            isValid = date >= today;
        }

        if (isValid) {
            return null;
        } else {
            return {
                dateInFuture: {
                    valid: false
                }
            };
        }

    }
}


@Directive({
    selector: '[dateInFuture][ngModel]',
    providers: [
        {provide: NG_VALIDATORS, useExisting: DateInFutureValidator, multi: true}
    ]
})

export class DateInFutureValidator implements Validator {
    validator: ValidatorFn;

    constructor() {
        this.validator = validateDateInFutureFactory();
    }

    validate(control: FormControl) {
        return this.validator(control);
    }

}
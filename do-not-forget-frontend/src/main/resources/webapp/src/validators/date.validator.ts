import {Directive} from '@angular/core';
import {NG_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl} from '@angular/forms';
import {CustomDate} from "../model/CustomDate";
import {DateValidationUtils} from "../utils/date.validator.utils"

function validateDateInFutureFactory(): ValidatorFn {

    return (control: AbstractControl) => {

        let isValid = false;
        let inputDate: CustomDate = control.value;

        if (inputDate && DateValidationUtils.isValidDate(inputDate)) {
            isValid = DateValidationUtils.isDateInTheFuture(inputDate);
        }

        return isValid ? null : {dateInFuture: {valid: false}};
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
import {CustomDate} from "../model/CustomDate";

export class DateValidationUtils {
    private static _isLeapYear(year) {
        return !(year % 400) || (year % 100 != 0 && year % 4 == 0);
    }

    static isValidDate(date: CustomDate) {
        let daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (DateValidationUtils._isLeapYear(date.year)) {
            daysInMonths[1] = 29;
        }

        return date.month > 0 && date.month <= 12 && date.day > 0 && date.day <= daysInMonths[date.month - 1];
    }

    static isCustomDateInTheFuture(inputDate: CustomDate) {
        let date: Date = new Date(inputDate.year, inputDate.month - 1, inputDate.day);
        let now: Date = new Date();
        let today: Date = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        return date >= today;
    }

    static isDateInTheFuture(date: Date) {
        let now: Date = new Date();
        let today: Date = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        return date >= today;
    }
}
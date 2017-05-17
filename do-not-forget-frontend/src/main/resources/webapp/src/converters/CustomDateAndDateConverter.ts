import {CustomDate} from "../model/CustomDate";
export class CustomDateAndDateConverter {

    public static toCustomDate(date: Date): CustomDate {
        let result = new CustomDate();
        result.day = date.getDay();
        result.month = date.getMonth();
        result.year = date.getFullYear();
        return result;
    }

    public static toDate(customDate: CustomDate): Date {
        let result = new Date;
        result.setDate(customDate.day);
        result.setMonth(customDate.month);
        result.setFullYear(customDate.year);
        return result;
    }

    public static fromArrayToDate(dateInArray: Array<number>) :Date {
        let result = new Date;
        result.setFullYear(dateInArray[0]);
        result.setMonth(dateInArray[1]);
        result.setDate(dateInArray[2]);
        return result;
    }
}
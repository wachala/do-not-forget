export class DateUtils {

    static getNextMonth() {
        let result = new Date;
        result.setMonth(result.getMonth() + 1);
        return result;
    }
}
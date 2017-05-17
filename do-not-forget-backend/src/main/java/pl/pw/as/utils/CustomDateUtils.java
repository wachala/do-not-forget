package pl.pw.as.utils;

import pl.pw.as.converters.CustomDateToJavaDateConverter;
import pl.pw.as.model.task.CustomDate;

import java.time.LocalDate;

public class CustomDateUtils {

    public static boolean isInPast(CustomDate date) {
        try {
            LocalDate deadLineLocal = new CustomDateToJavaDateConverter().toJavaDate(date);
            return deadLineLocal.compareTo(LocalDate.now()) < 0;
        } catch (Exception e) {
            return true;
        }
    }

    public static CustomDate now() {
        LocalDate now = LocalDate.now();
        return CustomDate.builder()
                .year(now.getYear())
                .month(now.getMonthValue())
                .day(now.getDayOfMonth())
                .build();
    }

    public static CustomDate of(int day, int month, int year) {
        return CustomDate.builder()
                .year(year)
                .month(month)
                .day(day)
                .build();
    }
}

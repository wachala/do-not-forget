package pl.pw.as.utils;

import pl.pw.as.converters.CustomDateToJavaDateConverter;
import pl.pw.as.model.task.CustomDate;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class CustomDateUtils {

    public static boolean isInPast(LocalDate date) {
        try {
//            LocalDate deadLineLocal = new CustomDateToJavaDateConverter().toJavaDate(date);
            return date.compareTo(LocalDate.now()) < 0;
        }
        catch (Exception e) {
            return true;
        }
    }
}

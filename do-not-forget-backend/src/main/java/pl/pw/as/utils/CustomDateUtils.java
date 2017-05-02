package pl.pw.as.utils;

import pl.pw.as.converters.CustomDateToJavaDateConverter;
import pl.pw.as.model.task.CustomDate;

import java.time.LocalDate;

public class CustomDateUtils {

    public static boolean isInPast(CustomDate date) {
        try {
            LocalDate deadLineLocal = new CustomDateToJavaDateConverter().toJavaDate(date);
            return deadLineLocal.compareTo(LocalDate.now()) < 0;
        }
        catch (Exception e) {
            return true;
        }
    }
}

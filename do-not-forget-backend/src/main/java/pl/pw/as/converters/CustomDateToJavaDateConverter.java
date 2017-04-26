package pl.pw.as.converters;

import pl.pw.as.model.task.CustomDate;

import java.time.LocalDate;

public class CustomDateToJavaDateConverter {
    public LocalDate toJavaDate(CustomDate customDate) {
        return LocalDate.of(customDate.getYear(), customDate.getMonth(), customDate.getDay());
    }
}

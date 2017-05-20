package pl.pw.as.converters;

import org.springframework.stereotype.Component;
import pl.pw.as.model.task.CustomDate;

import java.time.LocalDate;

@Component
public class CustomDateToJavaDateConverter {
    public LocalDate toJavaDate(CustomDate customDate) {
        return LocalDate.of(customDate.getYear(), customDate.getMonth(), customDate.getDay());
    }
}

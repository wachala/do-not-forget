package pl.pw.as.model.task;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Task {
    @Id
    private String id;
    private int estimateTime;
    private int spendTime;
    private int priority;
    private LocalDate deadLine;
    private LocalDate addedDate;
    private String title;
    private String description;
    private TaskState state;

}

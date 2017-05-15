package pl.pw.as.model.task;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

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
    private CustomDate deadLine;
    private CustomDate addedDate;
    private String title;
    private String description;
    private TaskState state;
}

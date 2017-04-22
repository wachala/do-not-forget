package pl.pw.as.model.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import pl.pw.as.model.task.Task;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    @Id
    private String email;
    private String name;
    private String surname;
    private String password;

    @DBRef
    List<Task> tasks;

    public boolean addTask(Task task) {
        return this.tasks.add(task);
    }
}

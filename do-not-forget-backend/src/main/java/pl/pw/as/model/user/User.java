package pl.pw.as.model.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import pl.pw.as.model.task.Task;

import java.util.ArrayList;
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
    List<Task> tasks = new ArrayList<>();

    public boolean addTask(Task task) {
        return tasks.add(task);
    }

    public boolean removeTask(Task task) {
        return tasks.remove(task);
    }

    public boolean editTask(Task task) {
        return removeTaskWithId(task.getId()) && addTask(task);
    }

    private boolean removeTaskWithId(String id) {
        for(Task task: tasks) {
            if(id.equals(task.getId())) {
                return removeTask(task);
            }
        }
        return false;
    }
}

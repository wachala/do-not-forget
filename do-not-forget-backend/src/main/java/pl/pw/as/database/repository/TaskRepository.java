package pl.pw.as.database.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.pw.as.model.task.Task;

import java.util.List;

public interface TaskRepository extends MongoRepository<Task, String> {
    List<Task> findByTitle(String title);
}

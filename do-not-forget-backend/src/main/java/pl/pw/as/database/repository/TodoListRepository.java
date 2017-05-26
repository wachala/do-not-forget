package pl.pw.as.database.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.pw.as.model.generator.TodoList;

public interface TodoListRepository extends MongoRepository<TodoList, String> {
}

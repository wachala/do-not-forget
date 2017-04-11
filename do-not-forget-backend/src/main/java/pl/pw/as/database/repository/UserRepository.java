package pl.pw.as.database.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.pw.as.model.user.User;

public interface UserRepository extends MongoRepository<User, String> {
}

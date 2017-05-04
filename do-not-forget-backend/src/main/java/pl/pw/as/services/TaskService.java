package pl.pw.as.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.pw.as.database.repository.TaskRepository;
import pl.pw.as.database.repository.UserRepository;
import pl.pw.as.model.task.CustomDate;
import pl.pw.as.model.task.Task;
import pl.pw.as.model.user.User;
import pl.pw.as.validators.Validator;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Validator<Task> taskValidator;

    public boolean addNewTask(Task task, User user) {
        log.info("Adding new task with title {} for user {}", task.getTitle(), user.getEmail());
        taskValidator.validate(task);

        LocalDateTime today = LocalDateTime.now();
        task.setAddedDate(CustomDate.builder()
                .day(today.getDayOfMonth())
                .month(today.getMonthValue())
                .year(today.getYear()).build());
        user.addTask(task);

        log.info("Saving task with title {}", task.getTitle());

        taskRepository.insert(task);
        userRepository.save(user);

        return true;
    }

    public List<Task> getAllTasks() {
        log.info("Getting all tasks");
        return taskRepository.findAll();
    }

    public List<Task> getAllUserTasks(User user) {
        log.info("Getting all tasks for user {}", user.getEmail());
        return user.getTasks();
    }

    public boolean deleteTask(Task task, User user) {
        log.info("Deleting task with id {} and user {}", task.getId(), user.getEmail());
        user.removeTask(task);

        userRepository.save(user);
        taskRepository.delete(task.getId());

        return true;
    }
}

package pl.pw.as.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.pw.as.database.repository.TaskRepository;
import pl.pw.as.database.repository.UserRepository;
import pl.pw.as.model.task.CustomDate;
import pl.pw.as.model.task.Task;
import pl.pw.as.model.task.TaskState;
import pl.pw.as.model.user.User;
import pl.pw.as.validators.Validator;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Validator<Task> taskValidator;

    @Autowired
    private Validator<TaskState> taskStateValidator;

    public boolean addNewTask(Task task, User user) {
        log.info("Adding new task with title {} for user {}", task.getTitle(), user.getEmail());
        taskValidator.validate(task);

        LocalDate today = LocalDate.now();
        task.setAddedDate(today);
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

    public boolean editTask(Task task) {
        log.info("Edit task with id: {}", task.getId());

        taskValidator.validate(task);

        taskRepository.save(task);

        return true;
    }


    public boolean editTaskState(Task task) {
        log.info("Update state of task with id: {}", task.getId());

        taskStateValidator.validate(task.getState());

        taskRepository.save(task);

        return true;
    }

    public Optional<Task> getTask(String id) {
        return Optional.ofNullable(taskRepository.findOne(id));
    }
}

package pl.pw.as.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
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
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    @Qualifier("task")
    private Validator<Task> taskValidator;

    public boolean addNewTask(Task task, User user) {
        taskValidator.validate(task);

        LocalDateTime today = LocalDateTime.now();
        task.setAddedDate(CustomDate.builder()
                .day(today.getDayOfMonth())
                .month(today.getMonthValue())
                .year(today.getYear()).build());
        user.addTask(task);

        taskRepository.insert(task);
        userRepository.save(user);

        return true;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }


    public List<Task> getAllUserTasks(User user) {
        return user.getTasks();
    }

    public boolean deleteTask(Task task, User user) {
        user.removeTask(task);

        userRepository.save(user);
        taskRepository.delete(task.getId());

        return true;
    }
}

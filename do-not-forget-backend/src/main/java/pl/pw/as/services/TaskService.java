package pl.pw.as.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.pw.as.database.repository.TaskRepository;
import pl.pw.as.model.task.CustomDate;
import pl.pw.as.model.task.Task;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public boolean addNewTask(Task task) {
        LocalDateTime today = LocalDateTime.now();
        task.setAddedDate(CustomDate.builder()
                .day(today.getDayOfMonth())
                .month(today.getMonthValue())
                .year(today.getYear()).build());
        taskRepository.save(task);
        return true;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public boolean deleteTask(Task task) {
        taskRepository.delete(task.getId());
        return true;
    }
}

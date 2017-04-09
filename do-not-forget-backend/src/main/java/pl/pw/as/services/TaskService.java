package pl.pw.as.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.pw.as.database.repository.TaskRepository;
import pl.pw.as.model.task.Task;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public boolean saveTask(Task task) {
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

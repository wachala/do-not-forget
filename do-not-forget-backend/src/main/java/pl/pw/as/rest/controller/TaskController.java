package pl.pw.as.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.pw.as.model.task.Task;
import pl.pw.as.services.TaskService;

import java.util.List;

@RestController
@RequestMapping(value = "task/")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @RequestMapping(value = "add", method = RequestMethod.POST)
    public boolean addTask(@RequestBody Task task) {
        return taskService.addNewTask(task);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Task> getAll() {
        return taskService.getAllTasks();
    }

    @RequestMapping(value="delete", method = RequestMethod.POST)
    public boolean delete(@RequestBody Task task) {
        return taskService.deleteTask(task);
    }
}

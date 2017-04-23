package pl.pw.as.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.pw.as.model.task.Task;
import pl.pw.as.security.UserIdRetrievingService;
import pl.pw.as.services.TaskService;
import pl.pw.as.services.UserService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping(value = "task/")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserIdRetrievingService idRetrievingService;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "add", method = RequestMethod.POST)
    public boolean addTask(@RequestBody Task task, HttpServletRequest request) {
        return taskService.addNewTask(task, userService.getUser(idRetrievingService.retrieve(request)));
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Task> getAll(HttpServletRequest request) {
        return taskService.getAllUserTasks(userService.getUser(idRetrievingService.retrieve(request)));
    }

    @RequestMapping(value="delete", method = RequestMethod.PUT)
    public boolean delete(@RequestBody Task task, HttpServletRequest request) {
        return taskService.deleteTask(task, userService.getUser(idRetrievingService.retrieve(request)));
    }
}

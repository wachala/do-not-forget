package pl.pw.as.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;
import pl.pw.as.model.generator.GeneratorStrategy;
import pl.pw.as.model.task.Task;
import pl.pw.as.model.user.User;
import pl.pw.as.security.UserIdRetrievingService;
import pl.pw.as.services.TaskService;
import pl.pw.as.services.ToDoGenerator;
import pl.pw.as.services.UserService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping(value = "task/")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserIdRetrievingService idRetrievingService;

    @Autowired
    private UserService userService;

    @Autowired
    private ToDoGenerator toDoGenerator;

    @RequestMapping(value = "add", method = RequestMethod.POST)
    public boolean addTask(@RequestBody Task task, HttpServletRequest request) {
        return taskService.addNewTask(task, extractUser(request));
    }

    @RequestMapping(method = GET)
    public List<Task> getAll(HttpServletRequest request) {
        return taskService.getAllUserTasks(extractUser(request));
    }

    @RequestMapping(value = "{id}", method = GET)
    public Task getTask(@PathVariable("id") String id) {
        Optional<Task> task = taskService.getTask(id);
        return task.orElseThrow(() -> new RuntimeException("Task not found"));
    }

    @RequestMapping(value = "delete", method = RequestMethod.PUT)
    public boolean delete(@RequestBody Task task, HttpServletRequest request) {
        return taskService.deleteTask(task, userService.getUser(idRetrievingService.retrieve(request)));
    }

    @RequestMapping(value = "edit", method = RequestMethod.PUT)
    public boolean edit(@RequestBody Task task) {
        return taskService.editTask(task);
    }

    @RequestMapping(value = "editTaskState", method = RequestMethod.PUT)
    public boolean editTaskState(@RequestBody Task task) {
        return taskService.editTaskState(task);
    }

    @RequestMapping(value = "editTimeSpend", method = RequestMethod.PUT)
    public void editTimeSpend(@RequestBody Task task) {
        taskService.editTimeSpendOnTask(task);
    }

    @RequestMapping(value = "recentlyExpired", method = RequestMethod.GET)
    public List<Task> editTaskState(HttpServletRequest request) {
        return taskService.getRecentlyExpiredTasks(extractUser(request));
    }

    @RequestMapping(value = "predictTime", method = GET)
    public long predictTime (@Param("pattern") String pattern, HttpServletRequest request) {
        return taskService.predictTime(extractUser(request), pattern);
    }

    @RequestMapping(value = "generate", method = GET)
    public List<Task> generateTasksToDo(@Param("strategy") String strategy, @Param("timeAvailable") int timeAvailable, HttpServletRequest request) {
        User user = extractUser(request);
        List<Task> userTasks  =  taskService.getAllUserTasks(user);

        return toDoGenerator.generateTasks(userTasks, GeneratorStrategy.valueOf(strategy), timeAvailable);
    }

    private User extractUser(HttpServletRequest request) {
        return userService.getUser(idRetrievingService.retrieve(request));
    }
}

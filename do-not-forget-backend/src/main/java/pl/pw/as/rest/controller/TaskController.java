package pl.pw.as.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;
import pl.pw.as.model.task.Task;
import pl.pw.as.retrievers.UserRetriever;
import pl.pw.as.services.TaskService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping(value = "task/")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    UserRetriever userRetriever;

    @RequestMapping(value = "add", method = RequestMethod.POST)
    public boolean addTask(@RequestBody Task task, HttpServletRequest request) {
        return taskService.addNewTask(task, userRetriever.retrieve(request));
    }

    @RequestMapping(method = GET)
    public List<Task> getAll(HttpServletRequest request) {
        return taskService.getAllUserTasks(userRetriever.retrieve(request));
    }

    @RequestMapping(value = "{id}", method = GET)
    public Task getTask(@PathVariable("id") String id) {
        Optional<Task> task = taskService.getTask(id);
        return task.orElseThrow(() -> new RuntimeException("Task not found"));
    }

    @RequestMapping(value = "delete", method = RequestMethod.PUT)
    public boolean delete(@RequestBody Task task, HttpServletRequest request) {
        return taskService.deleteTask(task, userRetriever.retrieve(request));
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
        return taskService.getRecentlyExpiredTasks(userRetriever.retrieve(request));
    }

    @RequestMapping(value = "predictTime", method = GET)
    public long predictTime(@Param("pattern") String pattern, HttpServletRequest request) {
        return taskService.predictTime(userRetriever.retrieve(request), pattern);
    }

}

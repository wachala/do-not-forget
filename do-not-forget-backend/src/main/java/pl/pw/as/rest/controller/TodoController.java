package pl.pw.as.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.pw.as.model.generator.GeneratorStrategy;
import pl.pw.as.model.generator.TodoList;
import pl.pw.as.model.task.Task;
import pl.pw.as.model.user.User;
import pl.pw.as.retrievers.UserRetriever;
import pl.pw.as.services.TodoListService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping(value = "todo/")
public class TodoController {

    @Autowired
    private TodoListService todoListService;

    @Autowired
    UserRetriever userRetriever;

    @RequestMapping(value = "generate", method = GET)
    public List<Task> generateTasksToDo(@Param("strategy") String strategy, @Param("timeAvailable") int timeAvailable, HttpServletRequest request) {
        User user = userRetriever.retrieve(request);

        return todoListService.generateTodoList(user, GeneratorStrategy.valueOf(strategy), timeAvailable);
    }

    @RequestMapping(value = "previous", method = GET)
    public TodoList getPreviouslyGeneratedTodoList(HttpServletRequest request) {
        User user = userRetriever.retrieve(request);

        return todoListService.getPreviouslyGeneratedTodoList(user);
    }

}

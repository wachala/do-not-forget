package pl.pw.as.retrievers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.pw.as.model.user.User;
import pl.pw.as.security.UserIdRetrievingService;
import pl.pw.as.services.UserService;

import javax.servlet.http.HttpServletRequest;

@Component
public class UserRetriever {

    @Autowired
    private UserService userService;

    @Autowired
    private UserIdRetrievingService idRetrievingService;

    public User retrieve(HttpServletRequest request) {
        return userService.getUser(idRetrievingService.retrieve(request));
    }

}

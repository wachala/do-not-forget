package pl.pw.as.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import pl.pw.as.model.user.UserInfo;
import pl.pw.as.security.UserIdRetrievingService;
import pl.pw.as.services.UserService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserIdRetrievingService idRetrievingService;


    @RequestMapping(method = RequestMethod.GET)
    public UserInfo getUserData(HttpServletRequest request) {
        return userService.getUserInfo(idRetrievingService.retrieve(request));
    }
}

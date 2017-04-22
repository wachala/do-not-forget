package pl.pw.as.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import pl.pw.as.model.registration.RegistrationData;
import pl.pw.as.services.UserService;

@RestController
public class RegistrationController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "signup", method = RequestMethod.POST)
    public boolean registerUser(@RequestBody RegistrationData registrationData) {
        return userService.addUser(registrationData);
    }
}

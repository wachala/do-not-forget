package pl.pw.as.services;

import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.pw.as.converters.UserToUserInfoConverter;
import pl.pw.as.database.repository.UserRepository;
import pl.pw.as.model.registration.RegistrationData;
import pl.pw.as.model.user.User;
import pl.pw.as.model.user.UserInfo;
import pl.pw.as.validators.Validator;

import java.time.LocalDate;

@Service
@Slf4j
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserToUserInfoConverter userToUserInfoConverter;

    @Autowired
    private Validator<RegistrationData> registrationDataValidator;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void addUser(RegistrationData registrationData) {
        log.info("Registering user with email {}", registrationData.getEmail());
        registrationDataValidator.validate(registrationData);

        User user = User.builder()
                .email(registrationData.getEmail())
                .name(registrationData.getName())
                .tasks(Lists.newArrayList())
                .surname(registrationData.getSurname())
                .password(passwordEncoder.encode(registrationData.getPassword()))
                .build();

        userRepository.insert(user);
    }

    public User getUser(String id) {
        log.info("Getting user data for user id {}", id);
        return userRepository.findOne(id);
    }

    public UserInfo getUserInfo(String id) {
        log.info("Getting user information for user id {}", id);

        User user = getUser(id);
        if (user == null)
            throw new RuntimeException("No user with email: '" + id + "' exist");
        return userToUserInfoConverter.convert(user);
    }

    public void updateLastBorwseTaskDate(User user) {
        log.info("Update last browse task date for user " + user.getEmail());

        user.setLastBrowseTaskDate(LocalDate.now());

        userRepository.save(user);
    }
}

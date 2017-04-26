package pl.pw.as.services;

import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import pl.pw.as.converters.UserToUserInfoConverter;
import pl.pw.as.database.repository.UserRepository;
import pl.pw.as.model.registration.RegistrationData;
import pl.pw.as.model.user.User;
import pl.pw.as.model.user.UserInfo;
import pl.pw.as.security.UserIdRetrievingService;
import pl.pw.as.validators.Validator;

@Service
public class UserService {
//TODO add password hashing with salt

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserToUserInfoConverter userToUserInfoConverter;

    @Autowired
    private Validator<RegistrationData> registrationDataValidator;

    public void addUser(RegistrationData registrationData) {
        registrationDataValidator.validate(registrationData);

        User user = User.builder()
                .email(registrationData.getEmail())
                .name(registrationData.getName())
                .tasks(Lists.newArrayList())
                .surname(registrationData.getSurname())
                .password(registrationData.getPassword())
                .build();

        userRepository.insert(user);
    }

    public User getUser(String id) {
        return userRepository.findOne(id);
    }

    public UserInfo getUserInfo(String id) {
        User user = getUser(id);
        if (user == null)
            throw new RuntimeException("No user with email: '" + id + "' exist");
        return userToUserInfoConverter.convert(user);
    }
}

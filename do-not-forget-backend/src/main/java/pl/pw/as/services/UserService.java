package pl.pw.as.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.pw.as.database.repository.UserRepository;
import pl.pw.as.model.registration.RegistrationData;
import pl.pw.as.model.user.User;

@Service
public class UserService {
//TODO add password hashing with salt

    @Autowired
    private UserRepository userRepository;

    public boolean addUser(RegistrationData registrationData) {
        User user = User.builder()
                .email(registrationData.getEmail())
                .name(registrationData.getName())
                .surname(registrationData.getSurname())
                .password(registrationData.getPassword())
                .build();

        userRepository.insert(user);
        return true;
    }
}

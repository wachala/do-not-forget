package pl.pw.as.validators;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.pw.as.database.repository.UserRepository;
import pl.pw.as.model.registration.RegistrationData;

import java.util.Objects;

@Component
@Slf4j
public class RegistrationDataValidator implements Validator<RegistrationData> {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void validate(RegistrationData data) {
        log.info("Validating registration data for user with email {}", data.getEmail());

        String errorMsg = "";
        boolean invalid = false;

        if (Objects.isNull(data.getName())) {
            errorMsg += "Name shouldn't be empty\n";
            invalid = true;
        }

        if (Objects.isNull(data.getSurname())) {
            errorMsg += "Surname shouldn't be empty\n";
            invalid = true;
        }

        if (Objects.isNull(data.getEmail()) || data.getEmail().matches(Patterns.VALID_EMAIL_ADDRESS_REGEX.pattern())) {
            errorMsg += "Wrong email\n";
            invalid = true;
        }

        if (Objects.isNull(data.getPassword()) || data.getPassword().length() < 4) {
            errorMsg += "Bad password\n";
            invalid = true;
        }

        if (userRepository.findOne(data.getEmail()) != null) {
            errorMsg += "User with " + data.getName() + "already exist\n";
            invalid = true;
        }

        if (invalid)
            throw new RuntimeException(errorMsg);
    }
}

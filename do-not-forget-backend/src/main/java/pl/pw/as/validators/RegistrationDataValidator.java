package pl.pw.as.validators;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import pl.pw.as.database.repository.UserRepository;
import pl.pw.as.model.registration.RegistrationData;

import java.util.Objects;

@Component
@Qualifier("registration")
public class RegistrationDataValidator implements Validator<RegistrationData> {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void validate(RegistrationData data) {
        String errorMsg="";
        boolean invalid = false;

        if(Objects.isNull(data.getName())) {
            errorMsg+="Name shouldn't be empty\n";
            invalid = true;
        }

        if(Objects.isNull(data.getSurname())) {
            errorMsg+="Surname sholuldn't be empty\n";
            invalid = true;
        }

        if(Objects.isNull(data.getEmail()) || data.getEmail().matches(Patterns.VALID_EMAIL_ADDRESS_REGEX.pattern())) {
            errorMsg+="Wrong email\n";
            invalid = true;
        }

        if(Objects.isNull(data.getPassword()) || data.getPassword().length() < 4){
            errorMsg+="Bad password\n";
            invalid = true;
        }

        if(userRepository.findOne(data.getEmail()) != null) {
            errorMsg+="User with " + data.getName() + "already exist\n";
            invalid = true;
        }

        if(invalid)
            throw new RuntimeException(errorMsg);

    }
}

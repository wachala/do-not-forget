package pl.pw.as.converters;

import org.springframework.stereotype.Component;
import pl.pw.as.model.user.User;
import pl.pw.as.model.user.UserInfo;

@Component
public class UserToUserInfoConverter {

    public UserInfo convert(User user) {
        return UserInfo.builder()
                .email(user.getEmail())
                .name(user.getName())
                .surname(user.getSurname())
                .build();
    }
}

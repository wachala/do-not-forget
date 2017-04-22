package pl.pw.as.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.annotation.Transactional;
import pl.pw.as.database.repository.UserRepository;
import pl.pw.as.model.user.User;

import java.util.Collections;

@Transactional
public class DoNotForgetUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public DoNotForgetUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            User user = userRepository.findOne(username);
            return new org.springframework.security.core.userdetails.User(user.getEmail(),
                    user.getPassword(), Collections.emptySet());
        } catch (Exception e) {
            throw new UsernameNotFoundException("User with email: '" + username + "'not found");
        }
    }
}

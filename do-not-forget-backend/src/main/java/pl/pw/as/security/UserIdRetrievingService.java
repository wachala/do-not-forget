package pl.pw.as.security;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import pl.pw.as.security.TokenAuthenticationService;

import javax.servlet.http.HttpServletRequest;

@Service
public class UserIdRetrievingService {
    public String retrieve(HttpServletRequest request) {
        Authentication authentication = TokenAuthenticationService.getAuthentication(request);

        if (authentication == null)
            throw new RuntimeException("Session expired");

        return authentication.getPrincipal().toString();
    }
}

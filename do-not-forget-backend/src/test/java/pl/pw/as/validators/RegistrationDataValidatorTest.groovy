package pl.pw.as.validators

import pl.pw.as.database.repository.UserRepository
import pl.pw.as.model.registration.RegistrationData
import pl.pw.as.model.user.User
import spock.lang.Shared
import spock.lang.Specification

import static org.mockito.Mockito.*

class RegistrationDataValidatorTest extends Specification {

    @Shared
    def userRepositoryMock = mock(UserRepository.class)

    @Shared
    def registrationValidator = new RegistrationDataValidator(
            userRepository: userRepositoryMock
    )

    def "should throw an exception when registration data is incorrect"() {
        given:
        def registrationData = new RegistrationData(
                email: email,
                name: name,
                surname: surename,
                password: password
        )

        when(userRepositoryMock.findOne(email)).thenReturn(repositoryResponse)

        when:
        registrationValidator.validate(registrationData)

        then:
        thrown RuntimeException

        where:
        email         | name   | surename | password | repositoryResponse
        null          | "John" | "Doe"    | "test1"  | null
        "doe@foo.com" | null   | "Doe"    | "test1"  | null
        "doe@foo.com" | "John" | null     | "test1"  | null
        "doe@foo.com" | "John" | "Doe"    | null     | null
        "doe@foo.com" | "John" | "Doe"    | "tes"    | null
        "doe@foo.com" | "John" | "Doe"    | "test"   | new User()
    }

    def "should not throw any exception when registration data is correct"() {
        given:
        def registrationData = new RegistrationData(
                email: "abc@bca.com",
                name: "John",
                surname: "Doe",
                password: "pass123"
        )
        when(userRepositoryMock.findOne("abc@bca.com")).thenReturn(null)

        when:
        registrationValidator.validate(registrationData)

        then:
        noExceptionThrown()
    }
}

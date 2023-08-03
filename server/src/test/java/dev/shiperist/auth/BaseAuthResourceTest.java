package dev.shiperist.auth;

import dev.shiperist.BaseTest;
import dev.shiperist.model.account.User;
import org.instancio.Instancio;
import org.junit.jupiter.api.BeforeEach;

import static org.instancio.Select.field;

public abstract class BaseAuthResourceTest extends BaseTest {

    protected User user;

    @BeforeEach
    public void setUp() {
        user = Instancio.of(User.class)
                .generate(field(User::getName), gen -> gen.text().uuid())
                .generate(field(User::getEmail), gen -> gen.text().pattern("#a#a#a#a#a@test.com"))
                .generate(field(User::getImage), gen -> gen.net().url().asString())
                .generate(field(User::getPassword), gen -> gen.text().uuid())
                .ignore(field(User::getId))
                .ignore(field(User::getEmailVerified))
                .create();
    }
}

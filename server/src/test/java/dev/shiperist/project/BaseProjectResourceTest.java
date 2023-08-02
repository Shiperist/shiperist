package dev.shiperist.project;

import dev.shiperist.entity.account.UserEntity;
import dev.shiperist.mapper.account.UserMapper;
import dev.shiperist.model.account.User;
import dev.shiperist.repository.account.UserRepository;
import io.quarkus.hibernate.reactive.panache.Panache;
import io.quarkus.vertx.VertxContextSupport;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import org.instancio.Instancio;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.TestInstance;

import static org.instancio.Select.field;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public abstract class BaseProjectResourceTest {

    @Inject
    UserRepository userRepository;

    @Inject
    UserMapper userMapper;

    @BeforeAll
    public void setUp() throws Throwable {
        User user = Instancio.of(User.class)
                .generate(field(User::getName), gen -> gen.text().uuid())
                .set(field(User::getEmail), "project@test.com")
                .generate(field(User::getImage), gen -> gen.net().url().asString())
                .generate(field(User::getPassword), gen -> gen.text().uuid())
                .ignore(field(User::getId))
                .ignore(field(User::getEmailVerified))
                .create();

        UserEntity userEntity = userMapper.toEntity(user);
        VertxContextSupport.subscribeAndAwait(() -> Panache.withTransaction(() -> userRepository.findByEmail(userEntity.getEmail()).flatMap(existingUser -> {
            if (existingUser == null) {
                return userRepository.persist(userEntity);
            } else {
                return Uni.createFrom().item(existingUser);
            }
        })));
    }
}

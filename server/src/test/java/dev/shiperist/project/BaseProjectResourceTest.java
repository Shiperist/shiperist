package dev.shiperist.project;

import dev.shiperist.BaseTest;
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
public abstract class BaseProjectResourceTest  extends BaseTest {

    @Inject
    UserRepository userRepository;

    @BeforeAll
    public void setUp() throws Throwable {
        UserEntity user = Instancio.of(UserEntity.class)
                .generate(field(UserEntity::getName), gen -> gen.text().uuid())
                .set(field(UserEntity::getEmail), "project@test.com")
                .generate(field(UserEntity::getImage), gen -> gen.net().url().asString())
                .generate(field(UserEntity::getPassword), gen -> gen.text().uuid())
                .ignore(field(UserEntity::getId))
                .ignore(field(UserEntity::getEmailVerified))
                .ignore(field(UserEntity::getAccounts))
                .ignore(field(UserEntity::getRefreshTokens))
                .ignore(field(UserEntity::getProjectMembers))
                .create();

        VertxContextSupport.subscribeAndAwait(() -> Panache.withTransaction(() -> userRepository.findByEmail(user.getEmail()).flatMap(existingUser -> {
            if (existingUser == null) {
                return userRepository.persist(user);
            } else {
                return Uni.createFrom().item(existingUser);
            }
        })));
    }
}

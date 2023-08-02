package dev.shiperist.app;

import dev.shiperist.data.OsType;
import dev.shiperist.data.ReleaseType;
import dev.shiperist.entity.account.UserEntity;
import dev.shiperist.entity.project.ProjectEntity;
import dev.shiperist.mapper.account.UserMapper;
import dev.shiperist.mapper.project.ProjectMapper;
import dev.shiperist.mapper.project.ProjectMemberMapper;
import dev.shiperist.model.account.User;
import dev.shiperist.model.project.Project;
import dev.shiperist.model.project.ProjectApp;
import dev.shiperist.model.project.ProjectMember;
import dev.shiperist.repository.account.UserRepository;
import dev.shiperist.repository.project.ProjectMemberRepository;
import dev.shiperist.repository.project.ProjectRepository;
import io.quarkus.hibernate.reactive.panache.Panache;
import io.quarkus.vertx.VertxContextSupport;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import org.instancio.Instancio;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestInstance;

import static org.instancio.Select.field;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public abstract class BaseProjectAppResourceTest {

    //TODO Add cleanup methods for tables @AfterAll

    @Inject
    UserRepository userRepository;

    @Inject
    ProjectRepository projectRepository;

    @Inject
    ProjectMemberRepository projectMemberRepository;

    @Inject
    UserMapper userMapper;

    @Inject
    ProjectMemberMapper projectMemberMapper;

    protected ProjectApp app;
    protected long projectId;

    @BeforeAll
    public void beforeAll() throws Throwable {
        UserEntity user = Instancio.of(UserEntity.class)
                .generate(field(UserEntity::getName), gen -> gen.text().uuid())
                .set(field(UserEntity::getEmail), "app@test.com")
                .generate(field(UserEntity::getImage), gen -> gen.net().url().asString())
                .generate(field(UserEntity::getPassword), gen -> gen.text().uuid())
                .ignore(field(UserEntity::getId))
                .ignore(field(UserEntity::getEmailVerified))
                .create();

        VertxContextSupport.subscribeAndAwait(() -> Panache.withTransaction(() -> userRepository.findByEmail(user.getEmail()).flatMap(existingUser -> {
            if (existingUser == null) {
                return userRepository.persistAndFlush(user);
            } else {
                return Uni.createFrom().item(existingUser);
            }
        })));

        ProjectEntity project = Instancio.of(ProjectEntity.class)
                .generate(field(ProjectEntity::getName), gen -> gen.text().uuid())
                .generate(field(ProjectEntity::getDisplayName), gen -> gen.text().uuid())
                .generate(field(ProjectEntity::getDescription), gen -> gen.text().loremIpsum().paragraphs(3))
                .generate(field(ProjectEntity::getImage), gen -> gen.net().url().asString())
                .ignore(field(ProjectEntity::getId))
                .ignore(field(ProjectEntity::getCreatedAt))
                .create();

        VertxContextSupport.subscribeAndAwait(() -> Panache.withTransaction(() -> projectRepository.persistAndFlush(project)));

        ProjectMember projectMember = new ProjectMember();
        projectMember.setProjectId(project.getId());
        projectMember.setUserId(user.getId());
        projectMember.setRole("admin");

        VertxContextSupport.subscribeAndAwait(() -> Panache.withTransaction(() -> projectMemberRepository.persistAndFlush(projectMemberMapper.toEntity(projectMember))));

        projectId = project.getId();
    }

    @BeforeEach
    public void beforeEach() {
        app = Instancio.of(ProjectApp.class)
                .generate(field(ProjectApp::getName), gen -> gen.text().uuid())
                .generate(field(ProjectApp::getDisplayName), gen -> gen.text().uuid())
                .generate(field(ProjectApp::getDescription), gen -> gen.text().loremIpsum().paragraphs(3))
                .generate(field(ProjectApp::getImage), gen -> gen.net().url().asString())
                .generate(field(ProjectApp::getOs), gen -> gen.enumOf(OsType.class))
                .generate(field(ProjectApp::getReleaseType), gen -> gen.enumOf(ReleaseType.class))
                .ignore(field(ProjectApp::getId))
                .ignore(field(ProjectApp::getCreatedAt))
                .ignore(field(ProjectApp::getUpdatedAt))
                .create();
    }
}

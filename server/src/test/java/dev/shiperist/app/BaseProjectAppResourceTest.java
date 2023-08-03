package dev.shiperist.app;

import dev.shiperist.BaseTest;
import dev.shiperist.data.OsType;
import dev.shiperist.data.ReleaseType;
import dev.shiperist.entity.account.UserEntity;
import dev.shiperist.entity.project.ProjectEntity;
import dev.shiperist.entity.project.ProjectMemberEntity;
import dev.shiperist.mapper.account.UserMapper;
import dev.shiperist.mapper.project.ProjectMemberMapper;
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
public abstract class BaseProjectAppResourceTest extends BaseTest {

    @Inject
    UserRepository userRepository;

    @Inject
    ProjectRepository projectRepository;

    @Inject
    ProjectMemberRepository projectMemberRepository;

    protected ProjectApp app;
    protected long projectId;

    @BeforeAll
    public void beforeAll() throws Throwable {
        UserEntity newUser = Instancio.of(UserEntity.class)
                .generate(field(UserEntity::getName), gen -> gen.text().uuid())
                .set(field(UserEntity::getEmail), "app@test.com")
                .generate(field(UserEntity::getImage), gen -> gen.net().url().asString())
                .generate(field(UserEntity::getPassword), gen -> gen.text().uuid())
                .ignore(field(UserEntity::getId))
                .ignore(field(UserEntity::getEmailVerified))
                .ignore(field(UserEntity::getAccounts))
                .ignore(field(UserEntity::getRefreshTokens))
                .ignore(field(UserEntity::getProjectMembers))
                .create();

        UserEntity user = VertxContextSupport.subscribeAndAwait(() -> Panache.withTransaction(() -> userRepository.findById(1L).flatMap(existingUser -> {
            if (existingUser == null) {
                return userRepository.persistAndFlush(newUser);
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
                .ignore(field(ProjectEntity::getProjectApps))
                .ignore(field(ProjectEntity::getProjectMembers))
                .create();

        VertxContextSupport.subscribeAndAwait(() -> Panache.withTransaction(() -> projectRepository.persistAndFlush(project)));

        ProjectMemberEntity projectMember = new ProjectMemberEntity();
        projectMember.setProject(project);
        projectMember.setUser(user);
        projectMember.setRole("admin");

        VertxContextSupport.subscribeAndAwait(() -> Panache.withTransaction(() -> projectMemberRepository.persistAndFlush(projectMember)));

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
                .ignore(field(ProjectApp::getProjectId))
                .ignore(field(ProjectApp::getCreatedAt))
                .ignore(field(ProjectApp::getUpdatedAt))
                .create();
    }
}

package dev.shiperist;

import dev.shiperist.repository.account.AccountRepository;
import dev.shiperist.repository.account.RefreshTokenRepository;
import dev.shiperist.repository.account.UserRepository;
import dev.shiperist.repository.project.ProjectAppRepository;
import dev.shiperist.repository.project.ProjectMemberRepository;
import dev.shiperist.repository.project.ProjectRepository;
import jakarta.inject.Inject;
import org.junit.jupiter.api.TestInstance;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public abstract class BaseTest {

    @Inject
    protected UserRepository userRepository;

    @Inject
    protected AccountRepository accountRepository;

    @Inject
    protected RefreshTokenRepository refreshTokenRepository;

    @Inject
    protected ProjectRepository projectRepository;

    @Inject
    protected ProjectMemberRepository projectMemberRepository;

    @Inject
    protected ProjectAppRepository projectAppRepository;
}

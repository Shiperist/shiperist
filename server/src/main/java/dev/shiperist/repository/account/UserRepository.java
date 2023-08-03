package dev.shiperist.repository.account;

import dev.shiperist.entity.account.UserEntity;
import io.quarkus.hibernate.reactive.panache.PanacheRepositoryBase;
import io.quarkus.hibernate.reactive.panache.common.WithSession;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;

@WithSession
@ApplicationScoped
public class UserRepository implements PanacheRepositoryBase<UserEntity, Long> {

    public Uni<UserEntity> findByEmail(String email) {
        return find("email", email).firstResult();
    }

    public Uni<Boolean> isMember(Long userId, Long projectId) {
        return count("id = ?1 and projects.id = ?2", userId, projectId).map(count -> count > 0);
    }
}

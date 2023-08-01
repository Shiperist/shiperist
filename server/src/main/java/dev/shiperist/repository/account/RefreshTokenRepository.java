package dev.shiperist.repository.account;

import dev.shiperist.entity.account.RefreshTokenEntity;
import io.quarkus.hibernate.reactive.panache.PanacheRepositoryBase;
import io.quarkus.hibernate.reactive.panache.common.WithSession;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@WithSession
@ApplicationScoped
public class RefreshTokenRepository implements PanacheRepositoryBase<RefreshTokenEntity, Long> {

    public Uni<RefreshTokenEntity> findByToken(String token) {
        return find("token", token).firstResult();
    }

    public Uni<Boolean> revokeAllForUser(Long userId) {
        return update("revoked = true where userId = ?1", userId).map(updateResult -> updateResult > 0);
    }
}

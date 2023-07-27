package dev.shiperist.repository.account;

import dev.shiperist.entity.account.RefreshTokenEntity;
import io.quarkus.hibernate.reactive.panache.PanacheRepositoryBase;
import io.quarkus.hibernate.reactive.panache.common.WithSession;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;

@WithSession
@ApplicationScoped
public class RefreshTokenRepository implements PanacheRepositoryBase<RefreshTokenEntity, Long> {

    public Uni<RefreshTokenEntity> findByToken(String token) {
        return find("sessionToken", token).firstResult();
    }
}

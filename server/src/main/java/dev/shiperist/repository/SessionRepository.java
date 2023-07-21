package dev.shiperist.repository;

import dev.shiperist.entity.SessionEntity;
import io.quarkus.hibernate.reactive.panache.PanacheRepository;
import io.quarkus.hibernate.reactive.panache.PanacheRepositoryBase;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SessionRepository implements PanacheRepositoryBase<SessionEntity, Long> {

    public Uni<SessionEntity> findByToken(String token) {
        return find("sessionToken", token).firstResult();
    }
}

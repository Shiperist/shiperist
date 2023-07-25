package dev.shiperist.repository;

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
}

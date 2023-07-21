package dev.shiperist.repository;

import dev.shiperist.entity.UserEntity;
import io.quarkus.hibernate.reactive.panache.PanacheRepository;
import io.quarkus.hibernate.reactive.panache.PanacheRepositoryBase;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UserRepository implements PanacheRepositoryBase<UserEntity, Long> {

    public Uni<UserEntity> findByEmail(String email) {
        return find("email", email).firstResult();
    }
}

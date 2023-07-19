package dev.shiperist.repository;

import dev.shiperist.entity.UserEntity;
import io.quarkus.hibernate.reactive.panache.PanacheRepository;
import io.smallrye.mutiny.Uni;

public class UserRepository implements PanacheRepository<UserEntity> {

    public Uni<UserEntity> findByEmail(String email) {
        return find("email", email).firstResult();
    }
}

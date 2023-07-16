package dev.shiperist.user.repository;

import dev.shiperist.user.entity.UserEntity;
import io.quarkus.hibernate.reactive.panache.PanacheRepository;

public class UserRepository implements PanacheRepository<UserEntity> {
}

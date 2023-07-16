package dev.shiperist.user.repository;

import dev.shiperist.user.entity.SessionEntity;
import io.quarkus.hibernate.reactive.panache.PanacheRepository;

public class SessionRepository implements PanacheRepository<SessionEntity> {
}

package dev.shiperist.repository;

import dev.shiperist.entity.SessionEntity;
import io.quarkus.hibernate.reactive.panache.PanacheRepository;

public class SessionRepository implements PanacheRepository<SessionEntity> {
}

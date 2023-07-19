package dev.shiperist.resource;

import dev.shiperist.entity.SessionEntity;
import dev.shiperist.mapper.SessionMapper;
import dev.shiperist.model.Session;
import dev.shiperist.repository.SessionRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.Optional;

@ApplicationScoped
public class SessionService {

    @Inject
    SessionRepository sessionRepository;

    @Inject
    SessionMapper sessionMapper;

    @Transactional
    public Uni<Session> createSession(Session session) {
        SessionEntity sessionEntity = sessionMapper.toEntity(session);
        return sessionRepository.persist(sessionEntity).map(sessionMapper::toDomain);
    }

    @Transactional
    public Uni<Optional<Session>> getSession(Long id) {
        return sessionRepository.findById(id)
                .map(sessionMapper::toDomain)
                .map(Optional::of)
                .onItem().ifNull().continueWith(Optional.empty());
    }

    @Transactional
    public Uni<Session> updateSession(Session session) {
        SessionEntity sessionEntity = sessionMapper.toEntity(session);
        return sessionRepository.persist(sessionEntity).map(sessionMapper::toDomain);
    }

    @Transactional
    public Uni<Boolean> deleteSession(Long sessionId) {
        return sessionRepository.deleteById(sessionId);
    }
}

package dev.shiperist.service;

import dev.shiperist.entity.SessionEntity;
import dev.shiperist.mapper.SessionMapper;
import dev.shiperist.model.Session;
import dev.shiperist.model.User;
import dev.shiperist.repository.SessionRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.quarkus.hibernate.reactive.panache.common.WithSession;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.security.Key;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Optional;

@WithSession
@ApplicationScoped
public class SessionService {

    @Inject
    SessionRepository sessionRepository;

    @Inject
    SessionMapper sessionMapper;

    @Transactional
    public Uni<Session> createSession(User user) {
        SessionEntity session = new SessionEntity();
        Date expires = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));

        session.setUserId(user.getId());
        session.setSessionToken(generateSessionToken(user, expires));
        session.setExpires(LocalDateTime.from(expires.toInstant()));

        return sessionRepository.persist(session).map(sessionMapper::toDomain);
    }

    @Transactional
    public Uni<Optional<Session>> getSession(Long id) {
        return sessionRepository.findById(id)
                .map(sessionMapper::toDomain)
                .map(Optional::of)
                .onItem().ifNull().continueWith(Optional.empty());
    }

    @Transactional
    public Uni<Optional<Session>> getSessionByToken(String token) {
        return sessionRepository.findByToken(token)
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

    private String generateSessionToken(User user, Date expires) {
        // Note: Should not use a randomly generated key. Use a fixed secret key or a key pair.
        Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

        return Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(expires)
                .signWith(key)
                .compact();
    }
}

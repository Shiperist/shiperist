package dev.shiperist.service.account;

import dev.shiperist.entity.account.RefreshTokenEntity;
import dev.shiperist.mapper.account.RefreshTokenMapper;
import dev.shiperist.model.account.RefreshToken;
import dev.shiperist.model.account.User;
import dev.shiperist.repository.account.RefreshTokenRepository;
import dev.shiperist.repository.account.UserRepository;
import dev.shiperist.util.SecurityUtil;
import io.quarkus.hibernate.reactive.panache.common.WithTransaction;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.NotFoundException;

@ApplicationScoped
public class TokenService {

    @Inject
    RefreshTokenRepository refreshTokenRepository;

    @Inject
    UserRepository userRepository;

    @Inject
    RefreshTokenMapper refreshTokenMapper;

    @WithTransaction
    public Uni<RefreshToken> createRefreshToken(User user) {
        return userRepository.findById(user.getId())
                .flatMap(foundUser -> {
                    if (foundUser == null) {
                        return Uni.createFrom().failure(new NotFoundException("User not found"));
                    }

                    RefreshTokenEntity refreshToken = new RefreshTokenEntity();
                    refreshToken.setUser(foundUser);
                    refreshToken.setToken(SecurityUtil.generateRefreshToken());

                    return refreshTokenRepository.persist(refreshToken).map(refreshTokenMapper::toDomain);
                });
    }

    @WithTransaction
    public Uni<RefreshToken> swapRefreshToken(String token) {
        return refreshTokenRepository.findByToken(token)
                .flatMap(refreshToken -> {
                    if (refreshToken == null) {
                        return Uni.createFrom().failure(new NotFoundException("Refresh token not found"));
                    }

                    if (refreshToken.isRevoked()) {
                        return Uni.createFrom().failure(new RuntimeException("Refresh token is revoked"));
                    }

                    refreshToken.setRevoked(true);

                    RefreshTokenEntity newRefreshToken = new RefreshTokenEntity();

                    newRefreshToken.setUser(refreshToken.getUser());
                    newRefreshToken.setToken(SecurityUtil.generateRefreshToken());

                    return refreshTokenRepository.persist(refreshToken).replaceWith(refreshTokenRepository.persist(newRefreshToken));
                })
                .map(refreshTokenMapper::toDomain);
    }

    @WithTransaction
    public Uni<Boolean> revokeRefreshToken(String token) {
        return refreshTokenRepository.findByToken(token)
                .flatMap(refreshToken -> {
                    refreshToken.setRevoked(true);
                    return refreshTokenRepository.persist(refreshToken).map(refreshTokenMapper::toDomain);
                }).map(RefreshToken::isRevoked);
    }

    @WithTransaction
    public Uni<Boolean> revokeAllRefreshTokensForUser(Long userId) {
        return refreshTokenRepository.revokeAllForUser(userId);
    }
}

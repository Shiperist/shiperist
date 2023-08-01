package dev.shiperist.service.account;

import dev.shiperist.entity.account.RefreshTokenEntity;
import dev.shiperist.mapper.account.RefreshTokenMapper;
import dev.shiperist.model.account.RefreshToken;
import dev.shiperist.model.account.User;
import dev.shiperist.repository.account.RefreshTokenRepository;
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
    RefreshTokenMapper refreshTokenMapper;

    @WithTransaction
    public Uni<RefreshToken> createRefreshToken(User user) {
        RefreshTokenEntity refreshToken = new RefreshTokenEntity();

        refreshToken.setUserId(user.getId());
        refreshToken.setToken(SecurityUtil.generateRefreshToken());

        return refreshTokenRepository.persist(refreshToken).map(refreshTokenMapper::toDomain);
    }

    @WithTransaction
    public Uni<RefreshToken> swapRefreshToken(String token) {
        return refreshTokenRepository.findByToken(token)
                .flatMap(refreshToken -> {
                    if(refreshToken == null) {
                        return Uni.createFrom().failure(new NotFoundException("Refresh token not found"));
                    }

                    if (refreshToken.isRevoked()) {
                        return Uni.createFrom().failure(new RuntimeException("Refresh token is revoked"));
                    }

                    refreshToken.setRevoked(true);

                    RefreshTokenEntity newRefreshToken = new RefreshTokenEntity();

                    newRefreshToken.setUserId(refreshToken.getUserId());
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

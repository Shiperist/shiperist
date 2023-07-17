package dev.shiperist.user.model;

import dev.shiperist.user.entity.UserEntity;
import lombok.Getter;

@Getter
public class Account {
    private String userId;
    private String type;
    private String provider;
    private String providerAccountId;
    private String refreshToken;
    private Integer refreshTokenExpiresIn;
    private String accessToken;
    private Integer expiresAt;
    private String tokenType;
    private String scope;
    private String idToken;
    private String sessionState;
    private UserEntity user;
}

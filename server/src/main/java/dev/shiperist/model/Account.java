package dev.shiperist.model;

import dev.shiperist.entity.UserEntity;
import lombok.Data;

@Data
public class Account {
    private Long id;
    private Long userId;
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

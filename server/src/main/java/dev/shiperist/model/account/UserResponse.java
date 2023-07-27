package dev.shiperist.model.account;

import lombok.Data;

@Data
public class UserResponse {
    private String accessToken;
    private String tokenType;
    private int expiresIn;
    private String refreshToken;
}

package dev.shiperist.user.model;

import dev.shiperist.user.entity.UserEntity;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class Session {
    private String sessionToken;
    private String userId;
    private LocalDateTime expires;
    private UserEntity user;
}

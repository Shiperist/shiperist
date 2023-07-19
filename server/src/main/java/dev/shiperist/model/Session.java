package dev.shiperist.model;

import dev.shiperist.entity.UserEntity;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Session {
    private String sessionToken;
    private String userId;
    private LocalDateTime expires;
    private UserEntity user;
}

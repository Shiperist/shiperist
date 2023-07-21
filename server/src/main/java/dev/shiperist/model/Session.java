package dev.shiperist.model;

import dev.shiperist.entity.UserEntity;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Session {
    private Long id;
    private Long userId;
    private String sessionToken;
    private LocalDateTime expires;
    private UserEntity user;
}

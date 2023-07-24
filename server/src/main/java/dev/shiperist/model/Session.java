package dev.shiperist.model;

import dev.shiperist.entity.UserEntity;
import lombok.Data;

import java.sql.Time;
import java.time.LocalDateTime;
import java.util.Date;

@Data
public class Session {
    private Long id;
    private Long userId;
    private String sessionToken;
    private Date expires;
    private UserEntity user;
}

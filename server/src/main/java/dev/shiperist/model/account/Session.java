package dev.shiperist.model.account;

import dev.shiperist.entity.account.UserEntity;
import lombok.Data;

import java.util.Date;

@Data
public class Session {
    private Long id;
    private Long userId;
    private String sessionToken;
    private Date expires;
    private UserEntity user;
}

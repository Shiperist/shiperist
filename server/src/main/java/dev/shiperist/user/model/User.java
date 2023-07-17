package dev.shiperist.user.model;

import dev.shiperist.user.entity.AccountEntity;
import dev.shiperist.user.entity.SessionEntity;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
public class User {
    private String name;
    private String email;
    private LocalDateTime emailVerified;
    private String image;
    private Set<AccountEntity> accounts;
    private Set<SessionEntity> sessions;
}

package dev.shiperist.model;

import dev.shiperist.entity.AccountEntity;
import dev.shiperist.entity.SessionEntity;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class User {
    private String name;
    private String email;
    private LocalDateTime emailVerified;
    private String image;
    private Set<AccountEntity> accounts;
    private Set<SessionEntity> sessions;
}
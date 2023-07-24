package dev.shiperist.model;

import dev.shiperist.entity.AccountEntity;
import dev.shiperist.entity.SessionEntity;
import lombok.Data;

import java.sql.Time;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

@Data
public class User {
    private Long id;
    private String name;
    private String email;
    private Date emailVerified;
    private String image;
    public String password;
    private Set<AccountEntity> accounts;
    private Set<SessionEntity> sessions;
}

package dev.shiperist.model.account;

import dev.shiperist.entity.account.AccountEntity;
import dev.shiperist.entity.account.RefreshTokenEntity;
import lombok.Data;

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
}

package dev.shiperist.model.account;

import lombok.Data;

@Data
public class UserCredentials {
    private String email;
    private String password;
}

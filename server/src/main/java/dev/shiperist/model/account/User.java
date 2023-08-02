package dev.shiperist.model.account;

import lombok.Data;

import java.util.Date;

@Data
public class User {
    public String password;
    private Long id;
    private String name;
    private String email;
    private Date emailVerified;
    private String image;
}

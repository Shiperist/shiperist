package dev.shiperist.model.account;

import lombok.Data;

import java.util.Date;

@Data
public class RefreshToken {
    public Long id;
    private String token;
    private Long userId;
    private Date expires;
    private boolean revoked;
    private Date createdAt;
    private Date updatedAt;
}

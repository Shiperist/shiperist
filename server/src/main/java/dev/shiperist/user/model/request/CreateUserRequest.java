package dev.shiperist.user.model.request;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class CreateUserRequest {
    private String name;
    private String email;
    private LocalDateTime isEmailVerified;
    private String image;
}

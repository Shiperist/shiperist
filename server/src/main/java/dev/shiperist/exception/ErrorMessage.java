package dev.shiperist.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ErrorMessage {

    public static final ErrorMessage EMAIL_ALREADY_EXISTS = new ErrorMessage("email", "Email already exists");
    public static final ErrorMessage INVALID_CREDENTIALS = new ErrorMessage("credentials", "Invalid credentials");
    public static final ErrorMessage INVALID_GRANT_TYPE = new ErrorMessage("grant_type", "Invalid grant type");
    public static final ErrorMessage INVALID_REFRESH_TOKEN = new ErrorMessage("refresh_token", "Invalid refresh token");

    private final String error;
    private final String description;
}

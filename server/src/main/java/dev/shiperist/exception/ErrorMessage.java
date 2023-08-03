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
    public static final ErrorMessage PROJECT_ALREADY_EXISTS = new ErrorMessage("project_name", "Project already exists");
    public static final ErrorMessage PROJECT_NOT_MEMBER = new ErrorMessage("project_id", "You are not a member of this project");
    public static final ErrorMessage PROJECT_NOT_FOUND = new ErrorMessage("project_id", "Project not found");
    public static final ErrorMessage PROJECT_APP_ALREADY_EXISTS = new ErrorMessage("project_app_name", "Project app already exists");
    public static final ErrorMessage PROJECT_APP_NOT_FOUND = new ErrorMessage("project_app_id", "Project app not found");
    public static final ErrorMessage PROJECT_APP_RELEASE_NOT_FOUND = new ErrorMessage("project_app_release_id", "Project app release not found");
    public static final ErrorMessage PROJECT_APP_UPLOAD_NOT_FOUND = new ErrorMessage("project_app_upload_id", "Project app upload not found");

    private final String error;
    private final String description;
}

package dev.shiperist.exception;

import lombok.Getter;

@Getter
public class ErrorMessageException extends RuntimeException{

    private final ErrorMessage errorMessage;

    public ErrorMessageException(ErrorMessage errorMessage) {
        this.errorMessage = errorMessage;
    }
}

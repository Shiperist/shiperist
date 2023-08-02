package dev.shiperist.data;

import lombok.Getter;

@Getter
public enum ReleaseType {

    ALPHA("alpha"),

    BETA("beta"),

    PRODUCTION("production");

    private final String value;

    ReleaseType(String value) {
        this.value = value;
    }

}

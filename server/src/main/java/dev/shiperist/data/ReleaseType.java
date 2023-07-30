package dev.shiperist.data;

public enum ReleaseType {

    ALPHA("alpha"),

    BETA("beta"),

    PRODUCTION("production");

    private final String value;

    ReleaseType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}

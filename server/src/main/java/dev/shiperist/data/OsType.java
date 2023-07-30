package dev.shiperist.data;

public enum OsType {
    ANDROID("android"),
    IOS("ios"),
    WINDOWS("windows"),
    WEB("web");

    private final String value;

    OsType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}

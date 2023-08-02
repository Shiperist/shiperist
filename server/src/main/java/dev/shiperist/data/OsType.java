package dev.shiperist.data;

import lombok.Getter;

@Getter
public enum OsType {
    ANDROID("android"),
    IOS("ios"),
    WINDOWS("windows"),
    WEB("web");

    private final String value;

    OsType(String value) {
        this.value = value;
    }

}

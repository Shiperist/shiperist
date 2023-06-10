package com.heligion.user.model;

import io.quarkus.security.identity.SecurityIdentity;
import lombok.Builder;
import lombok.Data;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.KeycloakSecurityContext;

import java.util.Date;

@Data
@Builder
public class User {

    private final String id;
    private final String displayName;
    private final String avatarUrl;
    private final String name;
    private final String email;
    private final String address;
    private final String phone;
    private final Date createdAt;
    private final Date updatedAt;

    public static User fromIdentity(SecurityIdentity identity) {
        var principal = (KeycloakPrincipal<KeycloakSecurityContext>) identity.getPrincipal();
        var accessToken = principal.getKeycloakSecurityContext().getToken();
        var userId = accessToken.getSubject();

        return User.builder()
                .id(userId)
                .displayName(accessToken.getPreferredUsername())
                .avatarUrl(accessToken.getPicture())
                .name(accessToken.getName())
                .email(accessToken.getEmail())
                .address(accessToken.getAddress().getFormattedAddress())
                .phone(accessToken.getPhoneNumber())
                .createdAt(new Date((Long) identity.getAttributes().get("created_at")))
                .updatedAt(new Date(accessToken.getUpdatedAt()))
                .build();
    }
}

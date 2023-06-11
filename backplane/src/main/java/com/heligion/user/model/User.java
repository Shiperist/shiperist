package com.heligion.user.model;

import io.quarkus.oidc.runtime.OidcJwtCallerPrincipal;
import io.quarkus.security.identity.SecurityIdentity;
import lombok.Builder;
import lombok.Data;

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
        var principal = identity.getPrincipal();
        if (!(principal instanceof OidcJwtCallerPrincipal oidcJwtCallerPrincipal)) {
            throw new RuntimeException("Principal is not an instance of OidcJwtCallerPrincipal");
        }

        System.out.println("JSON: " + oidcJwtCallerPrincipal.getClaims().toJson());

        var claims = oidcJwtCallerPrincipal.getClaims();

        return User.builder()
                .id(claims.getClaimValue("sub", String.class))
                .displayName(claims.get("name").toString())
                .avatarUrl(claims.get("picture").toString())
                .name(claims.get("name").toString())
                .email(claims.get("email").toString())
                .address(claims.get("address").toString())
                .phone(claims.get("phone").toString())
                .createdAt(new Date(Long.parseLong(claims.get("created_at").toString())))
                .updatedAt(new Date(Long.parseLong(claims.get("updated_at").toString())))
                .build();
    }
}

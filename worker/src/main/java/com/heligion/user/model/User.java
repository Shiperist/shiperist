package com.heligion.user.model;

import lombok.Builder;
import lombok.Data;
import org.keycloak.representations.account.UserRepresentation;

import java.util.Date;

@Data
@Builder
public class User {
    private final String id;
    private final String displayName;
    private final String avatarUrl;
    private final String firstName;
    private final String lastName;
    private final Date birthDate;
    private final String email;
    private final String address;
    private final String phone;
    private final Date createdAt;
    private final Date updatedAt;
}

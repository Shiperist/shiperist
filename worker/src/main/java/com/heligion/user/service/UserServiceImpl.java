package com.heligion.user.service;

import com.heligion.user.dto.UserUpdateRequest;
import com.heligion.user.model.User;
import io.quarkus.oidc.UserInfo;
import io.quarkus.security.identity.SecurityIdentity;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import org.keycloak.admin.client.Keycloak;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

// Theres is a currently a bug/not implemented feature in Quarkus that prevents us from using the reactive rest in here
// since keycloack thrown BlockingNotAllowedException when trying to use in the reactive context
// TODO - If possible, change this to use the reactive rest client

@RequestScoped
public class UserServiceImpl implements UserService {

    @Inject
    SecurityIdentity identity;

    @Inject
    UserInfo userProfile;

    @Inject
    Keycloak keycloak;

    public User currentUser() {
        var updatedAt = new Date();
        if (userProfile.get("updated_at") != null) {
            updatedAt = new Date(Long.parseLong(userProfile.get("updated_at").toString()) * 1000);
        }

        var createdAt = new Date();
        if (userProfile.get("created_at") != null) {
            createdAt = new Date(Long.parseLong(userProfile.get("created_at").toString()) * 1000);
        }

        var birthDate = new Date();
        if (userProfile.get("birthdate") != null) {
            birthDate = new Date(Long.parseLong(userProfile.get("birthdate").toString()) * 1000);
        }

        return User.builder()
                .id(userProfile.getSubject())
                .displayName(userProfile.getPreferredUserName())
                .avatarUrl(userProfile.getString("picture"))
                .firstName(userProfile.getFirstName())
                .lastName(userProfile.getFamilyName())
                .birthDate(birthDate)
                .email(userProfile.getEmail())
                .address(userProfile.getString("address"))
                .phone(userProfile.getString("phone_number"))
                .updatedAt(updatedAt)
                .createdAt(createdAt)
                .build();
    }

    public User updateUser(UserUpdateRequest userUpdateRequest) {
        var realm = keycloak.realm("quarkus");

        var userResource = realm.users().get(userProfile.getSubject());
        var userRepresentation = userResource.toRepresentation();

        if (userUpdateRequest.getDisplayName() != null) {
            userRepresentation.setUsername(userUpdateRequest.getDisplayName());
        }

        if (userUpdateRequest.getFirstName() != null) {
            userRepresentation.setFirstName(userUpdateRequest.getFirstName());
        }

        if (userUpdateRequest.getLastName() != null) {
            userRepresentation.setLastName(userUpdateRequest.getLastName());
        }

        var attributes = userRepresentation.getAttributes();
        if (attributes == null) {
            attributes = new HashMap<>();
        }

        if (userUpdateRequest.getAvatarUrl() != null) {
            attributes.put("picture", List.of(userUpdateRequest.getAvatarUrl()));
        }

        if (userUpdateRequest.getAddress() != null) {
            attributes.put("address", List.of(userUpdateRequest.getAddress()));
        }

        if (userUpdateRequest.getPhone() != null) {
            attributes.put("phone_number", List.of(userUpdateRequest.getPhone()));
        }

        var birthDate = new Date();
        if (userProfile.get("birthdate") != null) {
            birthDate = new Date(Long.parseLong(userProfile.get("birthdate").toString()) * 1000);
        }

        attributes.put("updated_at", List.of(String.valueOf(new Date().getTime())));
        userRepresentation.setAttributes(attributes);

        userResource.update(userRepresentation);

        return User.builder()
                .id(userProfile.getSubject())
                .displayName(userUpdateRequest.getDisplayName())
                .avatarUrl(userUpdateRequest.getAvatarUrl())
                .firstName(userUpdateRequest.getFirstName())
                .lastName(userUpdateRequest.getLastName())
                .birthDate(birthDate)
                .email(userProfile.getEmail())
                .address(userUpdateRequest.getAddress())
                .phone(userUpdateRequest.getPhone())
                .updatedAt(new Date())
                .createdAt(new Date())
                .build();
    }
}

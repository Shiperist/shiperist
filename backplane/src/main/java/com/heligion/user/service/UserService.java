package com.heligion.user.service;

import com.heligion.user.model.User;
import io.quarkus.security.identity.SecurityIdentity;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import org.keycloak.admin.client.Keycloak;

@RequestScoped
public class UserService {

    @Inject
    SecurityIdentity identity;

    @Inject
    Keycloak keycloak;

    public Uni<Response> user() {
        return Uni.createFrom().item(Response.ok(User.fromIdentity(identity)).build());
    }
}

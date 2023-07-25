package dev.shiperist.security;

import dev.shiperist.model.account.User;
import dev.shiperist.service.SessionService;
import dev.shiperist.service.UserService;
import io.quarkus.security.AuthenticationFailedException;
import io.quarkus.security.credential.TokenCredential;
import io.quarkus.security.identity.AuthenticationRequestContext;
import io.quarkus.security.identity.IdentityProvider;
import io.quarkus.security.identity.SecurityIdentity;
import io.quarkus.security.identity.request.TokenAuthenticationRequest;
import io.quarkus.security.runtime.QuarkusSecurityIdentity;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class CustomIdentityProvider implements IdentityProvider<TokenAuthenticationRequest> {

    @Inject
    UserService userService;

    @Inject
    SessionService sessionService;

    @Override
    public Class<TokenAuthenticationRequest> getRequestType() {
        return TokenAuthenticationRequest.class;
    }

    @Override
    public Uni<SecurityIdentity> authenticate(TokenAuthenticationRequest request,
                                              AuthenticationRequestContext context) {
        String token = request.getToken().getToken();

        return sessionService.getSessionByToken(token)
                .flatMap(session -> {
                    if (session.isPresent()) {
                        return userService.getUser(session.get().getUserId());
                    } else {
                        return Uni.createFrom().failure(new AuthenticationFailedException());
                    }
                })
                .flatMap(user -> {
                    if (user.isPresent()) {
                        return Uni.createFrom().item(buildIdentity(user.get(), token));
                    } else {
                        return Uni.createFrom().failure(new AuthenticationFailedException());
                    }
                });
    }

    private SecurityIdentity buildIdentity(User user, String token) {
        return QuarkusSecurityIdentity.builder()
                .setPrincipal(user::getEmail)
                .addAttribute("userId", user.getId())
                .addCredential(new TokenCredential(token, "bearer"))
                .build();
    }
}

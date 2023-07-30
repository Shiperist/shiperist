package dev.shiperist.resource;

import dev.shiperist.model.account.User;
import dev.shiperist.model.account.UserResponse;
import dev.shiperist.service.account.AccountService;
import dev.shiperist.service.account.TokenService;
import dev.shiperist.service.account.UserService;
import dev.shiperist.util.SecurityUtil;
import io.smallrye.mutiny.Uni;
import jakarta.annotation.security.PermitAll;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.Date;
import java.util.Optional;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {


    @Inject
    UserService userService;

    @Inject
    AccountService accountService;

    @Inject
    TokenService tokenService;

    @GET
    @PermitAll
    @Path("/settings")
    public Uni<Response> getSettings() {
        // Implement logic to return public settings of the instance.
        return Uni.createFrom().item(Response.ok().build());
    }

    @POST
    @PermitAll
    @Path("/signup")
    public Uni<User> signUp(User user) {
        return userService.createUser(user.getName(), user.getEmail(), user.getImage(), user.getPassword());
    }

    @POST
    @PermitAll
    @Path("/verify")
    public Uni<Response> verifyUser(User user) {
        // Implement the logic for user verification here.
        return Uni.createFrom().item(Response.ok().build());
    }

    @POST
    @PermitAll
    @Path("/recover")
    public Uni<Response> recoverPassword(User user) {
        // Implement the logic for password recovery here.
        return Uni.createFrom().item(Response.ok().build());
    }

    @POST
    @PermitAll
    @Path("/token")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Uni<Response> getToken(@FormParam("grant_type") String grantType,
                                  @FormParam("email") String email,
                                  @FormParam("password") String password,
                                  @FormParam("refresh_token") String refreshToken) {
        UserResponse response = new UserResponse();

        return switch (grantType) {
            case "password" -> userService.getUserByEmail(email)
                    .flatMap(user -> {
                        if (user.isEmpty()) {
                            return Uni.createFrom().item(Response.status(Response.Status.UNAUTHORIZED)
                                    .entity("Invalid email or password.").build());
                        }

                        User validUser = user.get();

                        if (userService.checkPassword(password, validUser.getPassword())) {
                            return tokenService.createRefreshToken(validUser)
                                    .map(token -> {
                                        response.setAccessToken(SecurityUtil.generateToken(validUser, new Date()));
                                        response.setTokenType("bearer");
                                        response.setExpiresIn(3600);
                                        response.setRefreshToken(token.getToken());
                                        return Response.ok(response).build();
                                    });
                        } else {
                            return Uni.createFrom().item(Response.status(Response.Status.UNAUTHORIZED)
                                    .entity("Invalid email or password.").build());
                        }
                    });
            case "refresh_token" ->
                // Assuming the refresh_token is the sessionId.
                    tokenService.swapRefreshToken(refreshToken)
                            .flatMap(token -> userService.getUser(token.getUserId()))
                            .map(user -> {
                                if (user.isEmpty()) {
                                    return Response.status(Response.Status.UNAUTHORIZED)
                                            .entity("Invalid refresh token.").build();
                                }

                                User validUser = user.get();

                                response.setAccessToken(SecurityUtil.generateToken(validUser, new Date()));
                                response.setTokenType("bearer");
                                response.setExpiresIn(3600);
                                response.setRefreshToken(refreshToken);

                                return Response.ok(response).build();
                            });
            default -> Uni.createFrom().item(Response.status(Response.Status.BAD_REQUEST)
                    .entity("Invalid grant_type parameter.").build());
        };
    }

    @GET
    @Path("/user/{id}")
    public Uni<Optional<User>> getUser(@PathParam("id") Long id) {
        return userService.getUser(id);
    }

    @PUT
    @Path("/user")
    public Uni<User> updateUser(User user) {
        return userService.updateUser(user);
    }

    @POST
    @Path("/logout")
    public Uni<Response> logoutUser(User user) {
        // Implement the logic to logout the user (invalidate all sessions).
        return Uni.createFrom().item(Response.ok().build());
    }
}

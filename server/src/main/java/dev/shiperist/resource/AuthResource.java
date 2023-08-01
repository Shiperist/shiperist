package dev.shiperist.resource;

import dev.shiperist.exception.ErrorMessage;
import dev.shiperist.model.account.User;
import dev.shiperist.model.account.UserResponse;
import dev.shiperist.service.account.AccountService;
import dev.shiperist.service.account.TokenService;
import dev.shiperist.service.account.UserService;
import dev.shiperist.util.SecurityUtil;
import io.quarkus.security.Authenticated;
import io.smallrye.mutiny.Uni;
import jakarta.annotation.security.PermitAll;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.jwt.Claim;
import org.eclipse.microprofile.jwt.Claims;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;

import java.util.Date;

import static io.netty.handler.codec.http.HttpHeaders.Values.APPLICATION_JSON;

@RequestScoped
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

    @Inject
    @Claim(standard = Claims.sub)
    String sub;

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
    @Operation(summary = "Signs up a new user")
    @APIResponse(
            responseCode = "200",
            description = "The created user",
            content = @Content(mediaType = APPLICATION_JSON, schema = @Schema(implementation = User.class, required = true))
    )
    @APIResponse(
            responseCode = "400",
            description = "The user with the given email already exists"
    )
    public Uni<Response> signUp(User user) {
        return userService.createUser(user.getName(), user.getEmail(), user.getImage(), user.getPassword())
                .onItem().ifNotNull().transform(u -> Response.status(Response.Status.CREATED).entity(u).build());
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
    @Operation(summary = "Returns a new access token")
    @APIResponse(
            responseCode = "200",
            description = "The response containing the access token",
            content = @Content(mediaType = APPLICATION_JSON, schema = @Schema(implementation = UserResponse.class, required = true))
    )
    @APIResponse(
            responseCode = "401",
            description = "Invalid email or password"
    )
    public Uni<Response> getToken(@FormParam("grant_type") String grantType,
                                  @FormParam("email") String email,
                                  @FormParam("password") String password,
                                  @FormParam("refresh_token") String refreshToken) {
        UserResponse response = new UserResponse();

        return switch (grantType) {
            case "password" -> userService.getUserByEmail(email)
                    .flatMap(user -> {
                        if (user == null) {
                            return Uni.createFrom().item(Response.status(Response.Status.UNAUTHORIZED)
                                    .entity(ErrorMessage.INVALID_CREDENTIALS).build());
                        }

                        if (userService.checkPassword(password, user.getPassword())) {
                            return tokenService.createRefreshToken(user)
                                    .map(token -> {
                                        response.setAccessToken(SecurityUtil.generateToken(user, new Date()));
                                        response.setTokenType("bearer");
                                        response.setExpiresIn(3600);
                                        response.setRefreshToken(token.getToken());
                                        return Response.ok(response).build();
                                    });
                        } else {
                            return Uni.createFrom().item(Response.status(Response.Status.UNAUTHORIZED)
                                    .entity(ErrorMessage.INVALID_CREDENTIALS).build());
                        }
                    });
            case "refresh_token" -> tokenService.swapRefreshToken(refreshToken)
                    .flatMap(token -> userService.getUser(token.getUserId()))
                    .map(user -> {
                        response.setAccessToken(SecurityUtil.generateToken(user, new Date()));
                        response.setTokenType("bearer");
                        response.setExpiresIn(3600);
                        response.setRefreshToken(refreshToken);

                        return Response.ok(response).build();
                    });
            default -> Uni.createFrom().item(Response.status(Response.Status.BAD_REQUEST)
                    .entity(ErrorMessage.INVALID_GRANT_TYPE).build());
        };
    }

    @HEAD
    @Authenticated
    @Path("/logout")
    @Operation(summary = "Logs out the user")
    @APIResponse(
            responseCode = "200",
            description = "Logout successful"
    )
    public Uni<Response> logoutUser() {
        return tokenService.revokeAllRefreshTokensForUser(Long.parseLong(sub))
                .map(ignored -> Response.ok().build());
    }
}

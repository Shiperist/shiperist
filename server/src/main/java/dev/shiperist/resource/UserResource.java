package dev.shiperist.resource;

import dev.shiperist.model.account.User;
import dev.shiperist.service.account.UserService;
import io.quarkus.security.Authenticated;
import io.smallrye.mutiny.Uni;
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

import static io.netty.handler.codec.http.HttpHeaders.Values.APPLICATION_JSON;

@RequestScoped
@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {

    @Inject
    UserService userService;

    @Inject
    @Claim(standard = Claims.sub)
    String sub;

    @GET
    @Authenticated
    @Path("{id}")
    @Operation(summary = "Returns user information")
    @APIResponse(
            responseCode = "200",
            description = "The user information",
            content = @Content(mediaType = APPLICATION_JSON, schema = @Schema(implementation = User.class, required = true))
    )
    @APIResponse(
            responseCode = "403",
            description = "Forbidden"
    )
    public Uni<Response> getUser(@PathParam("id") Long id) {
        if (id == null || !id.equals(Long.parseLong(sub))) {
            return Uni.createFrom().item(Response.status(Response.Status.FORBIDDEN).build());
        }
        return userService.getUser(id)
                .map(user -> Response.ok(user).build());
    }

    @PATCH
    @Authenticated
    @Path("{id}")
    @Operation(summary = "Updates user information")
    @APIResponse(
            responseCode = "200",
            description = "The updated user",
            content = @Content(mediaType = APPLICATION_JSON, schema = @Schema(implementation = User.class, required = true))
    )
    @APIResponse(
            responseCode = "403",
            description = "Forbidden"
    )
    public Uni<Response> updateUser(@PathParam("id") Long id, User user) {
        if (user.getId() == null || !id.equals(Long.parseLong(sub))) {
            return Uni.createFrom().item(Response.status(Response.Status.FORBIDDEN).build());
        }

        return userService.updateUser(user)
                .map(updatedUser -> Response.ok(updatedUser).build());
    }
}

package com.heligion.user.resource;

import com.heligion.user.dto.UserResponse;
import com.heligion.user.dto.UserUpdateRequest;
import com.heligion.user.service.UserService;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PATCH;
import jakarta.ws.rs.Path;

@Path("/api/users")
public class UserResource {

    // TODO - Move to reactive keycloak client
    // TODO - Think of a better way to set dynamicaly keycloak url
    @Inject
    UserService userService;

    @GET
    @Path("/user")
    public UserResponse user() {
        return new UserResponse(userService.currentUser());
    }

    @PATCH
    @Path("/user")
    public UserResponse updateUser(UserUpdateRequest request) {
        return new UserResponse(userService.updateUser(request));
    }

    /*@GET
    @Produces
    @Path("/{id}")
    public Response getUser(@PathParam("id") Long id) {
        return Response.ok().build();
    }

    @GET
    @Produces
    public Response getAllUsers() {
        return Response.ok().build();
    }

    @PUT
    @Produces
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateUser(@PathParam("id") Long id, UserRequest userRequest) {
        return Response.ok().build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteUser(@PathParam("id") Long id) {
        return Response.ok().build();
    }*/
}

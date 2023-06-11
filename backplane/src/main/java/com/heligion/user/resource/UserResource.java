package com.heligion.user.resource;

import com.heligion.user.service.UserService;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/api/users")
public class UserResource {

    @Inject
    UserService userService;

    @GET
    @Path("/user")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Uni<Response> user() {
        return userService.user();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/test")
    public Response test() {
        return Response.ok().build();
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

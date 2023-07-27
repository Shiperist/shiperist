package dev.shiperist.resource;

import dev.shiperist.model.project.Project;
import dev.shiperist.service.project.ProjectService;
import io.quarkus.security.Authenticated;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import org.eclipse.microprofile.jwt.Claim;
import org.eclipse.microprofile.jwt.Claims;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.enums.SchemaType;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import java.util.List;

import static io.netty.handler.codec.http.HttpHeaders.Values.APPLICATION_JSON;

@RequestScoped
@Path("/projects")
@Tag(name = "Projects")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProjectResource {

    @Inject
    ProjectService projectService;

    @Inject
    @Claim(standard = Claims.sub)
    String sub;

    @PUT
    @Authenticated
    @Path("createProject/{name}")
    @Operation(summary = "Creates a new project")
    @APIResponse(
            responseCode = "200",
            description = "The created project",
            content = @Content(mediaType = APPLICATION_JSON, schema = @Schema(implementation = Project.class, required = true))
    )
    @APIResponse(
            responseCode = "400",
            description = "The project already exists"
    )
    @APIResponse(
            responseCode = "401",
            description = "The user is not authenticated"
    )
    public Uni<Response> createProject(@PathParam("name") String name) {
        return projectService.createProject(name, Long.parseLong(sub))
                .onItem().ifNotNull().transform(project -> Response.ok(project).build())
                .onItem().ifNull().continueWith(Response.status(Response.Status.BAD_REQUEST).build());

    }

    @GET
    @Authenticated
    @Path("{id}")
    @Operation(summary = "Returns a project by id")
    @APIResponse(
            responseCode = "200",
            description = "The project",
            content = @Content(mediaType = APPLICATION_JSON, schema = @Schema(implementation = Project.class, required = true))
    )
    @APIResponse(
            responseCode = "404",
            description = "The project does not exist"
    )
    @APIResponse(
            responseCode = "401",
            description = "The user is not authenticated"
    )
    public Uni<Response> getProject(@PathParam("id") Long id, @Context SecurityContext securityContext) {
        return projectService.getProject(id)
                .onItem().ifNotNull().transform(project -> Response.ok(project).build())
                .onItem().ifNull().continueWith(Response.status(Response.Status.NOT_FOUND).build());
    }

    @PATCH
    @Authenticated
    @Path("{id}")
    @Operation(summary = "Updates a project")
    @APIResponse(
            responseCode = "200",
            description = "The project",
            content = @Content(mediaType = APPLICATION_JSON, schema = @Schema(implementation = Project.class, required = true))
    )
    @APIResponse(
            responseCode = "404",
            description = "The project does not exist"
    )
    @APIResponse(
            responseCode = "401",
            description = "The user is not authenticated"
    )
    public Uni<Response> updateProject(@PathParam("id") Long id, Project project) {
        return projectService.updateProject(id, project.getDisplayName(), project.getDescription(), project.getImage())
                .onItem().ifNotNull().transform(updated -> Response.ok(updated).build())
                .onItem().ifNull().continueWith(Response.status(Response.Status.NOT_FOUND).build());
    }

    @GET
    @Authenticated
    @Path("list")
    @Operation(summary = "Returns all projects")
    @APIResponse(
            responseCode = "200",
            description = "All projects",
            content = @Content(mediaType = APPLICATION_JSON, schema = @Schema(implementation = Project.class, type = SchemaType.ARRAY))
    )
    @APIResponse(
            responseCode = "401",
            description = "The user is not authenticated"
    )
    public Uni<List<Project>> listProjects() {
        return projectService.listProjects();
    }
}

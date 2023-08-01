package dev.shiperist.resource;

import dev.shiperist.model.project.Project;
import dev.shiperist.model.request.ProjectRequest;
import dev.shiperist.service.project.ProjectMemberService;
import dev.shiperist.service.project.ProjectService;
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
import org.eclipse.microprofile.openapi.annotations.enums.SchemaType;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import java.util.List;

import static io.netty.handler.codec.http.HttpHeaders.Values.APPLICATION_JSON;

@RequestScoped
@Authenticated
@Path("/projects")
@Tag(name = "Projects")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProjectResource {

    @Inject
    ProjectService projectService;

    @Inject
    ProjectMemberService projectMemberService;

    @Inject
    @Claim(standard = Claims.sub)
    String sub;

    @PUT
    @Operation(summary = "Creates a new project")
    @APIResponse(
            responseCode = "201",
            description = "The created project",
            content = @Content(mediaType = APPLICATION_JSON, schema = @Schema(implementation = Project.class, required = true))
    )
    @APIResponse(
            responseCode = "400",
            description = "The project already exists"
    )
    public Uni<Response> createProject(ProjectRequest request) {
        return projectService.createProject(Long.parseLong(sub), request.getName(), request.getDisplayName(), request.getDescription(), request.getImage())
                .onItem().ifNotNull().transform(project -> Response.status(Response.Status.CREATED).entity(project).build())
                .onItem().ifNull().continueWith(Response.status(Response.Status.BAD_REQUEST).build());

    }

    @GET
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
    public Uni<Response> getProject(@PathParam("id") Long id) {
        return projectMemberService.isMember(id, Long.parseLong(sub))
                .flatMap(isMember -> {
                    if (isMember) {
                        return projectService.getProject(id).map(project -> project != null ? Response.ok(project).build() : Response.status(Response.Status.NOT_FOUND).build());
                    } else {
                        return Uni.createFrom().item(Response.status(Response.Status.NOT_FOUND).build());
                    }
                });
    }

    @PATCH
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
    public Uni<Response> updateProject(@PathParam("id") Long id, ProjectRequest request) {
        return projectService.updateProject(id, request.getDisplayName(), request.getDescription(), request.getImage())
                .onItem().ifNotNull().transform(updated -> Response.ok(updated).build())
                .onItem().ifNull().continueWith(Response.status(Response.Status.NOT_FOUND).build());
    }

    @GET
    @Path("list")
    @Operation(summary = "Returns all projects")
    @APIResponse(
            responseCode = "200",
            description = "All projects",
            content = @Content(mediaType = APPLICATION_JSON, schema = @Schema(implementation = Project.class, type = SchemaType.ARRAY))
    )
    public Uni<List<Project>> listProjects() {
        return projectService.listProjects();
    }
}

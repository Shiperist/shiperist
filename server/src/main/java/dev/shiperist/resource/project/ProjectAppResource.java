package dev.shiperist.resource.project;

import dev.shiperist.exception.ErrorMessage;
import dev.shiperist.model.project.ProjectApp;
import dev.shiperist.service.project.ProjectAppService;
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
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;


@RequestScoped
@Authenticated
@Path("/projects/{projectId}/apps")
@Tag(name = "Project Apps")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProjectAppResource extends BaseProjectResource {

    //TODO Add project member to have permission to create project app

    @Inject
    ProjectAppService projectAppService;

    @Inject
    @Claim(standard = Claims.sub)
    String sub;

    //TODO Is this is the correct way to do it I mean to work with entities possibly in here or move it to the service layer?

    @PUT
    @Operation(summary = "Create a project app")
    @APIResponse(
            responseCode = "201",
            description = "The project app was created",
            content = @Content(schema = @Schema(implementation = ProjectApp.class))
    )
    public Uni<Response> createProjectApp(@Parameter(description = "Project ID") @PathParam("projectId") Long projectId, ProjectApp app) {
        return projectAppService.createProjectApp(projectId, Long.parseLong(sub), app.getName(), app.getDisplayName(), app.getDescription(), app.getImage(), app.getOs(), app.getReleaseType())
                .onItem().ifNotNull().transform(projectApp -> Response.status(Response.Status.CREATED).entity(projectApp).build());
    }

    @PATCH
    @Path("{id}")
    @Operation(summary = "Update a project app")
    @APIResponse(
            responseCode = "200",
            description = "The project app was updated",
            content = @Content(schema = @Schema(implementation = ProjectApp.class))
    )
    public Uni<Response> updateProjectApp(@Parameter(description = "Project App ID") @PathParam("id") Long id, ProjectApp app) {
        return projectAppService.updateProjectApp(id, Long.parseLong(sub), app.getName(), app.getDisplayName(), app.getDescription(), app.getImage())
                .onItem().ifNotNull().transform(projectApp -> Response.status(Response.Status.OK).entity(projectApp).build());
    }

    @GET
    @Path("{id}")
    @Operation(summary = "Get a project app")
    @APIResponse(
            responseCode = "200",
            description = "The project app was found",
            content = @Content(schema = @Schema(implementation = ProjectApp.class))
    )
    public Uni<Response> getProjectApp(@Parameter(description = "Project App ID") @PathParam("id") Long id) {
        return projectAppService.getProjectApp(id, Long.parseLong(sub))
                .onItem().ifNotNull().transform(projectApp -> Response.status(Response.Status.OK).entity(projectApp).build());
    }

    @GET
    @Operation(summary = "Get all project apps for a project")
    @APIResponse(
            responseCode = "200",
            description = "The project apps were found",
            content = @Content(schema = @Schema(implementation = ProjectApp.class))
    )
    public Uni<Response> getProjectApps(@Parameter(description = "Project ID") @PathParam("projectId") Long projectId) {
        return projectAppService.getProjectApps(projectId, Long.parseLong(sub))
                .onItem().ifNotNull().transform(projectApps -> Response.status(Response.Status.OK).entity(projectApps).build());
    }
}
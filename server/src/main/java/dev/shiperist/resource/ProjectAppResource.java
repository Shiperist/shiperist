package dev.shiperist.resource;

import dev.shiperist.model.project.ProjectApp;
import dev.shiperist.service.project.ProjectAppService;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import java.util.List;


@RequestScoped
@Path("/projects/{projectId}/apps")
@Tag(name = "Project Apps")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProjectAppResource {

    @Inject
    ProjectAppService projectAppService;

    @POST
    public Uni<ProjectApp> createProjectApp(@PathParam("projectId") Long projectId, ProjectApp app) {
        return projectAppService.createProjectApp(projectId, app.getName(), app.getDescription(), app.getImage(), app.getOs(), app.getReleaseType());
    }

    @PATCH
    @Path("{id}")
    public Uni<ProjectApp> updateProjectApp(@PathParam("id") Long id, ProjectApp app) {
        return projectAppService.updateProjectApp(id, app.getName(), app.getDescription(), app.getImage());
    }

    @DELETE
    @Path("{id}")
    public Uni<Boolean> deleteProjectApp(@PathParam("id") Long id) {
        return projectAppService.deleteProjectApp(id);
    }

    @GET
    @Path("{id}")
    public Uni<ProjectApp> getProjectApp(@PathParam("id") Long id) {
        return projectAppService.getProjectApp(id);
    }

    @GET
    public Uni<List<ProjectApp>> getProjectApps(@PathParam("projectId") Long projectId) {
        return projectAppService.getProjectApps(projectId);
    }
}

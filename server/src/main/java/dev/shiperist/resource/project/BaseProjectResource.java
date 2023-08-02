package dev.shiperist.resource.project;

import dev.shiperist.service.project.ProjectMemberService;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;

import java.util.function.Function;

public abstract class BaseProjectResource {

    @Inject
    ProjectMemberService projectMemberService;

    protected Uni<Response> ifMember(Long userId, Long projectId, Function<Boolean, Uni<Response>> function) {
        return projectMemberService.isMember(userId, projectId)
                .flatMap(isMember -> {
                    if (isMember) {
                        return function.apply(isMember);
                    } else {
                        return Uni.createFrom().item(Response.status(Response.Status.FORBIDDEN).build());
                    }
                });
    }
}

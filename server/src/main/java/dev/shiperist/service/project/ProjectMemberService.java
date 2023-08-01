package dev.shiperist.service.project;

import dev.shiperist.repository.project.ProjectMemberRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class ProjectMemberService {

    @Inject
    ProjectMemberRepository projectMemberRepository;

    public Uni<Boolean> isMember(Long projectId, Long userId) {
        return projectMemberRepository.isMember(projectId, userId);
    }
}

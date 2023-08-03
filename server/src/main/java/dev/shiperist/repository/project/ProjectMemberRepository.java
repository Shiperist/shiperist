package dev.shiperist.repository.project;

import dev.shiperist.entity.project.ProjectMemberEntity;
import io.quarkus.hibernate.reactive.panache.PanacheRepositoryBase;
import io.quarkus.hibernate.reactive.panache.common.WithSession;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;

@WithSession
@ApplicationScoped
public class ProjectMemberRepository implements PanacheRepositoryBase<ProjectMemberEntity, Long> {

    public Uni<Boolean> isMember(Long projectId, Long userId) {
        return count("project.id = ?1 and user.id = ?2", projectId, userId).map(count -> count > 0);
    }
}

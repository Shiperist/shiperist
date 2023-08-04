package dev.shiperist.repository.project;

import dev.shiperist.entity.project.ProjectEntity;
import io.quarkus.hibernate.reactive.panache.PanacheRepositoryBase;
import io.quarkus.hibernate.reactive.panache.common.WithSession;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.Objects;

@WithSession
@ApplicationScoped
public class ProjectRepository implements PanacheRepositoryBase<ProjectEntity, Long> {

    public Uni<ProjectEntity> findByName(String name) {
        return find("name", name).firstResult();
    }

    public Uni<Boolean> hasPermission(Long projectId, Long userId) {
        return find("id = ?1 and projectMembers.user.id = ?2", projectId, userId).firstResult().map(Objects::nonNull);
    }

    public Uni<ProjectEntity> getIfMember(Long projectId, Long userId) {
        return find("select p from Project p join p.projectMembers m where p.id = ?1 and m.user.id = ?2", projectId, userId).firstResult();
    }
}

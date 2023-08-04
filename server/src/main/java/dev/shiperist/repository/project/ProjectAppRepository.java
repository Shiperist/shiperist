package dev.shiperist.repository.project;

import dev.shiperist.entity.project.ProjectAppEntity;
import io.quarkus.hibernate.reactive.panache.PanacheRepositoryBase;
import io.quarkus.hibernate.reactive.panache.common.WithSession;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;
import java.util.Objects;

@WithSession
@ApplicationScoped
public class ProjectAppRepository implements PanacheRepositoryBase<ProjectAppEntity, Long> {

    public Uni<ProjectAppEntity> findByName(String name) {
        return find("name", name).firstResult();
    }

    public Uni<List<ProjectAppEntity>> findByProject(Long projectId) {
        return find("project.id", projectId).list();
    }

    public Uni<Boolean> hasPermission(Long appId, Long userId) {
        return find("id = ?1 and project.projectMembers.user.id = ?2", appId, userId).firstResult().map(Objects::nonNull);
    }

    public Uni<ProjectAppEntity> getIfMember(Long appId, Long userId) {
        return find("select p from ProjectApp p join p.project.projectMembers m where p.id = ?1 and m.user.id = ?2", appId, userId).firstResult();
    }
}

package dev.shiperist.repository.project;

import dev.shiperist.entity.project.ProjectEntity;
import io.quarkus.hibernate.reactive.panache.PanacheRepositoryBase;
import io.quarkus.hibernate.reactive.panache.common.WithSession;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;

@WithSession
@ApplicationScoped
public class ProjectRepository implements PanacheRepositoryBase<ProjectEntity, Long> {

    public Uni<ProjectEntity> findByName(String name) {
        return find("name", name).firstResult();
    }
}

package dev.shiperist.repository.project;

import dev.shiperist.entity.project.ProjectAppEntity;
import io.quarkus.hibernate.reactive.panache.PanacheRepositoryBase;
import io.quarkus.hibernate.reactive.panache.common.WithSession;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;

@WithSession
@ApplicationScoped
public class ProjectAppRepository implements PanacheRepositoryBase<ProjectAppEntity, Long> {

    public Uni<ProjectAppEntity> findByName(String name) {
        return find("name", name).firstResult();
    }
}

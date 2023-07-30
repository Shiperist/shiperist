package dev.shiperist.repository.project;

import dev.shiperist.entity.project.ProjectAppEntity;
import io.quarkus.hibernate.reactive.panache.PanacheRepositoryBase;
import io.quarkus.hibernate.reactive.panache.common.WithSession;
import jakarta.enterprise.context.ApplicationScoped;

@WithSession
@ApplicationScoped
public class ProjectAppRepository implements PanacheRepositoryBase<ProjectAppEntity, Long> {
}

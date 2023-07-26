package dev.shiperist.service.project;

import dev.shiperist.entity.account.UserEntity;
import dev.shiperist.entity.project.ProjectEntity;
import dev.shiperist.mapper.project.ProjectMapper;
import dev.shiperist.model.project.Project;
import dev.shiperist.repository.account.UserRepository;
import dev.shiperist.repository.project.ProjectRepository;
import io.quarkus.hibernate.reactive.panache.common.WithTransaction;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.List;
import java.util.Set;

@ApplicationScoped
public class ProjectService {

    @Inject
    ProjectRepository projectRepository;

    @Inject
    UserRepository userRepository;

    @Inject
    ProjectMapper projectMapper;


    @WithTransaction
    public Uni<Project> createProject(String name, String owner) {
        return userRepository.findById(owner)
                .map(user -> {
                    ProjectEntity projectEntity = new ProjectEntity();
                    projectEntity.setName(name);
                    projectEntity.getUsers().add(user);
                    return projectEntity;
                })
                .flatMap(projectRepository::persist)
                .map(projectMapper::toDomain);
    }

    public Uni<Project> getProject(Long name) {
        return projectRepository.findById(name).map(projectMapper::toDomain);
    }

    @WithTransaction
    public Uni<Project> updateProject(Long id, String displayName, String description, String image) {
        return projectRepository.findById(id)
                .map(project -> {
                    project.setDisplayName(displayName);
                    project.setDescription(description);
                    project.setImage(image);
                    return project;
                })
                .map(projectMapper::toDomain);
    }

    public Uni<List<Project>> listProjects() {
        return projectRepository.listAll().map(projectMapper::toDomainList);
    }
}

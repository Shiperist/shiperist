package dev.shiperist.service.project;

import dev.shiperist.data.OsType;
import dev.shiperist.data.ReleaseType;
import dev.shiperist.entity.project.ProjectAppEntity;
import dev.shiperist.mapper.project.ProjectAppMapper;
import dev.shiperist.model.project.ProjectApp;
import dev.shiperist.repository.project.ProjectAppRepository;
import dev.shiperist.repository.project.ProjectRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.List;

@ApplicationScoped
public class ProjectAppService {


    @Inject
    ProjectRepository projectService;

    @Inject
    ProjectAppRepository projectAppRepository;

    @Inject
    ProjectAppMapper projectAppMapper;

    public Uni<ProjectApp> createProjectApp(Long projectId, String name, String displayName, String description, String image, OsType os, ReleaseType releaseType) {
        return projectService.findById(projectId)
                .onItem().ifNull().failWith(() -> new RuntimeException("Project not found"))
                .map(project -> {
                    ProjectAppEntity projectApp = new ProjectAppEntity();
                    projectApp.setName(name);
                    projectApp.setDisplayName(displayName);
                    projectApp.setDescription(description);
                    projectApp.setImage(image);
                    projectApp.setOs(os);
                    projectApp.setReleaseType(releaseType);
                    projectApp.setProjectId(projectId);
                    return projectApp;
                })
                .onItem().ifNotNull().transformToUni(projectAppRepository::persistAndFlush)
                .onItem().ifNotNull().transform(projectAppMapper::toDomain);
    }

    public Uni<ProjectApp> updateProjectApp(Long id, String name, String displayName, String description, String image) {
        return projectAppRepository.findById(id)
                .onItem().ifNull().failWith(() -> new RuntimeException("Project App not found"))
                .map(projectApp -> {
                    projectApp.setName(name);
                    projectApp.setDisplayName(displayName);
                    projectApp.setDescription(description);
                    projectApp.setImage(image);
                    return projectApp;
                })
                .onItem().ifNotNull().transformToUni(projectAppRepository::persistAndFlush)
                .onItem().ifNotNull().transform(projectAppMapper::toDomain);
    }

    public Uni<ProjectApp> getProjectApp(Long id) {
        return projectAppRepository.findById(id).map(projectAppMapper::toDomain);
    }

    public Uni<List<ProjectApp>> getProjectApps(Long projectId) {
        return projectAppRepository.list("projectId", projectId).map(projectAppMapper::toDomainList);
    }

    public Uni<Boolean> deleteProjectApp(Long id) {
        return projectAppRepository.deleteById(id);
    }
}

package dev.shiperist.service.project;

import dev.shiperist.data.OsType;
import dev.shiperist.data.ReleaseType;
import dev.shiperist.entity.project.ProjectAppEntity;
import dev.shiperist.entity.project.ProjectEntity;
import dev.shiperist.exception.ErrorMessage;
import dev.shiperist.exception.ErrorMessageException;
import dev.shiperist.mapper.project.ProjectAppMapper;
import dev.shiperist.model.project.ProjectApp;
import dev.shiperist.repository.project.ProjectAppRepository;
import dev.shiperist.repository.project.ProjectRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.NotFoundException;

import java.util.List;

@ApplicationScoped
public class ProjectAppService {


    @Inject
    ProjectRepository projectService;

    @Inject
    ProjectAppRepository projectAppRepository;

    @Inject
    ProjectAppMapper projectAppMapper;

    public Uni<ProjectApp> createProjectApp(Long projectId, Long userId, String name, String displayName, String description, String image, OsType os, ReleaseType releaseType) {
        return projectService.getIfMember(projectId, userId)
                .onItem().ifNull().failWith(new ErrorMessageException(ErrorMessage.PROJECT_NOT_FOUND))
                .map(project -> buildProjectAppEntity(project, name, displayName, description, image, os, releaseType))
                .onItem().ifNotNull().transformToUni(this::persistIfNotExists)
                .onItem().ifNotNull().transform(projectAppMapper::toDomain);
    }

    public Uni<ProjectApp> updateProjectApp(Long id, Long userId, String name, String displayName, String description, String image) {
        return projectAppRepository.getIfMember(id, userId)
                .onItem().ifNull().failWith(new ErrorMessageException(ErrorMessage.PROJECT_APP_NOT_FOUND))
                .map(projectApp -> updateProjectAppEntity(projectApp, name, displayName, description, image))
                .onItem().ifNotNull().transformToUni(this::persistIfNotExists)
                .onItem().ifNotNull().transform(projectAppMapper::toDomain);
    }

    public Uni<ProjectApp> getProjectApp(Long id, Long userId) {
        return projectAppRepository.getIfMember(id, userId)
                .onItem().ifNull().failWith(new ErrorMessageException(ErrorMessage.PROJECT_APP_NOT_FOUND))
                .map(projectAppMapper::toDomain);
    }

    public Uni<List<ProjectApp>> getProjectApps(Long projectId, Long userId) {
        return projectService.getIfMember(projectId, userId)
                .onItem().ifNull().failWith(new ErrorMessageException(ErrorMessage.PROJECT_NOT_FOUND))
                .onItem().ifNotNull().transformToUni(project -> projectAppRepository.findByProject(projectId))
                .onItem().ifNotNull().transform(projectAppMapper::toDomainList);
    }

    private Uni<ProjectAppEntity> persistIfNotExists(ProjectAppEntity projectApp) {
        return projectAppRepository.findByName(projectApp.getName())
                .onItem().ifNotNull().failWith(new ErrorMessageException(ErrorMessage.PROJECT_APP_ALREADY_EXISTS))
                .onItem().ifNull().switchTo(() -> projectAppRepository.persistAndFlush(projectApp));
    }

    private ProjectAppEntity buildProjectAppEntity(ProjectEntity project, String name, String displayName, String description, String image, OsType os, ReleaseType releaseType) {
        String appName = constructAppName(project.getName(), name);
        ProjectAppEntity projectApp = new ProjectAppEntity();
        projectApp.setName(appName);
        projectApp.setDisplayName(displayName);
        projectApp.setDescription(description);
        projectApp.setImage(image);
        projectApp.setOs(os);
        projectApp.setReleaseType(releaseType);
        projectApp.setProject(project);
        return projectApp;
    }

    //TODO: Set project to eager
    private ProjectAppEntity updateProjectAppEntity(ProjectAppEntity projectApp, String name, String displayName, String description, String image) {
        String appName = constructAppName(projectApp.getProject().getName(), name);
        projectApp.setName(appName);
        projectApp.setDisplayName(displayName);
        projectApp.setDescription(description);
        projectApp.setImage(image);
        return projectApp;
    }

    private String constructAppName(String projectName, String appName) {
        return projectName + "/" + appName;
    }
}

package dev.shiperist.mapper.project;

import dev.shiperist.entity.project.ProjectEntity;
import dev.shiperist.mapper.QuarkusMappingConfig;
import dev.shiperist.model.project.Project;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(config = QuarkusMappingConfig.class)
public interface ProjectMapper {

    List<Project> toDomainList(List<ProjectEntity> entities);

    Project toDomain(ProjectEntity entity);

    @InheritInverseConfiguration(name = "toDomain")
    ProjectEntity toEntity(Project domain);

    void updateEntityFromDomain(Project domain, @MappingTarget ProjectEntity entity);

    void updateDomainFromEntity(ProjectEntity entity, @MappingTarget Project domain);
}

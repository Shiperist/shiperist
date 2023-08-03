package dev.shiperist.mapper.project;

import dev.shiperist.entity.project.ProjectAppEntity;
import dev.shiperist.mapper.QuarkusMappingConfig;
import dev.shiperist.model.project.ProjectApp;
import org.mapstruct.*;

import java.util.List;

@Mapper(config = QuarkusMappingConfig.class)
public interface ProjectAppMapper {

    List<ProjectApp> toDomainList(List<ProjectAppEntity> entities);

    @Mappings({
            @Mapping(target="projectId", expression="java(entity.getProject().getId())")
    })
    ProjectApp toDomain(ProjectAppEntity entity);

    @InheritInverseConfiguration(name = "toDomain")
    ProjectAppEntity toEntity(ProjectApp domain);

    void updateEntityFromDomain(ProjectApp domain, @MappingTarget ProjectAppEntity entity);

    void updateDomainFromEntity(ProjectAppEntity entity, @MappingTarget ProjectApp domain);
}

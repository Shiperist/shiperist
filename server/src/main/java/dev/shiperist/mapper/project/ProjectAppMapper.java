package dev.shiperist.mapper.project;

import dev.shiperist.entity.project.ProjectAppEntity;
import dev.shiperist.mapper.QuarkusMappingConfig;
import dev.shiperist.model.project.ProjectApp;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(config = QuarkusMappingConfig.class)
public interface ProjectAppMapper {

    List<ProjectApp> toDomainList(List<ProjectAppEntity> entities);

    ProjectApp toDomain(ProjectAppEntity entity);

    @InheritInverseConfiguration(name = "toDomain")
    ProjectAppEntity toEntity(ProjectApp domain);

    void updateEntityFromDomain(ProjectApp domain, @MappingTarget ProjectAppEntity entity);

    void updateDomainFromEntity(ProjectAppEntity entity, @MappingTarget ProjectApp domain);
}

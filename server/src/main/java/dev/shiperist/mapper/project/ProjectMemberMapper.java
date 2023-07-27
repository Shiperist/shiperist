package dev.shiperist.mapper.project;

import dev.shiperist.entity.project.ProjectMemberEntity;
import dev.shiperist.mapper.QuarkusMappingConfig;
import dev.shiperist.model.project.ProjectMember;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(config = QuarkusMappingConfig.class)
public interface ProjectMemberMapper {
    List<ProjectMember> toDomainList(List<ProjectMemberEntity> entities);

    ProjectMember toDomain(ProjectMemberEntity entity);

    @InheritInverseConfiguration(name = "toDomain")
    ProjectMemberEntity toEntity(ProjectMember domain);

    void updateEntityFromDomain(ProjectMember domain, @MappingTarget ProjectMemberEntity entity);

    void updateDomainFromEntity(ProjectMemberEntity entity, @MappingTarget ProjectMember domain);
}

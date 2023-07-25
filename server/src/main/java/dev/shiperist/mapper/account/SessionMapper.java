package dev.shiperist.mapper.account;

import dev.shiperist.entity.account.SessionEntity;
import dev.shiperist.mapper.QuarkusMappingConfig;
import dev.shiperist.model.account.Session;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(config = QuarkusMappingConfig.class)
public interface SessionMapper {

    List<Session> toDomainList(List<SessionEntity> entities);

    Session toDomain(SessionEntity entity);

    @InheritInverseConfiguration(name = "toDomain")
    SessionEntity toEntity(Session domain);

    void updateEntityFromDomain(Session domain, @MappingTarget SessionEntity entity);

    void updateDomainFromEntity(SessionEntity entity, @MappingTarget Session domain);
}

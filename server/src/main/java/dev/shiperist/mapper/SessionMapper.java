package dev.shiperist.mapper;

import dev.shiperist.entity.SessionEntity;
import dev.shiperist.model.Session;
import org.mapstruct.Mapper;

@Mapper(componentModel = "jakarta")
public interface SessionMapper {

    SessionEntity toEntity(Session domain);

    Session toDomain(SessionEntity entity);
}

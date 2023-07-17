package dev.shiperist.user.mapper;

import dev.shiperist.user.entity.SessionEntity;
import dev.shiperist.user.model.Session;
import org.mapstruct.Mapper;

@Mapper(componentModel = "jakarta")
public interface SessionMapper {

    SessionEntity toEntity(Session domain);

    Session toDomain(SessionEntity entity);
}

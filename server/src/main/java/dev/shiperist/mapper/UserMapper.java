package dev.shiperist.mapper;

import dev.shiperist.entity.UserEntity;
import dev.shiperist.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "jakarta")
public interface UserMapper {

    UserEntity toEntity(User domain);

    User toDomain(UserEntity entity);
}

package dev.shiperist.user.mapper;

import dev.shiperist.user.entity.UserEntity;
import dev.shiperist.user.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "jakarta")
public interface UserMapper {

    UserEntity toEntity(User domain);

    User toDomain(UserEntity entity);
}

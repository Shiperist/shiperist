package dev.shiperist.mapper.account;

import dev.shiperist.entity.account.UserEntity;
import dev.shiperist.mapper.QuarkusMappingConfig;
import dev.shiperist.model.account.User;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(config = QuarkusMappingConfig.class)
public interface UserMapper {

    List<User> toDomainList(List<UserEntity> entities);

    User toDomain(UserEntity entity);

    @InheritInverseConfiguration(name = "toDomain")
    UserEntity toEntity(User domain);

    void updateEntityFromDomain(User domain, @MappingTarget UserEntity entity);

    void updateDomainFromEntity(UserEntity entity, @MappingTarget User domain);
}

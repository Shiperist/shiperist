package dev.shiperist.mapper.account;

import dev.shiperist.entity.account.RefreshTokenEntity;
import dev.shiperist.mapper.QuarkusMappingConfig;
import dev.shiperist.model.account.RefreshToken;
import org.mapstruct.*;

import java.util.List;

@Mapper(config = QuarkusMappingConfig.class)
public interface RefreshTokenMapper {

    List<RefreshToken> toDomainList(List<RefreshTokenEntity> entities);

    @Mappings({
            @Mapping(target = "userId", expression = "java(entity.getUser().getId())"),
    })
    RefreshToken toDomain(RefreshTokenEntity entity);

    @InheritInverseConfiguration(name = "toDomain")
    RefreshTokenEntity toEntity(RefreshToken domain);

    void updateEntityFromDomain(RefreshToken domain, @MappingTarget RefreshTokenEntity entity);

    void updateDomainFromEntity(RefreshTokenEntity entity, @MappingTarget RefreshToken domain);
}

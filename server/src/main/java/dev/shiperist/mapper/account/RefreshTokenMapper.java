package dev.shiperist.mapper.account;

import dev.shiperist.entity.account.RefreshTokenEntity;
import dev.shiperist.mapper.QuarkusMappingConfig;
import dev.shiperist.model.account.RefreshToken;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(config = QuarkusMappingConfig.class)
public interface RefreshTokenMapper {

    List<RefreshToken> toDomainList(List<RefreshTokenEntity> entities);

    RefreshToken toDomain(RefreshTokenEntity entity);

    @InheritInverseConfiguration(name = "toDomain")
    RefreshTokenEntity toEntity(RefreshToken domain);

    void updateEntityFromDomain(RefreshToken domain, @MappingTarget RefreshTokenEntity entity);

    void updateDomainFromEntity(RefreshTokenEntity entity, @MappingTarget RefreshToken domain);
}

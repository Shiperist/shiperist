package dev.shiperist.mapper;

import dev.shiperist.entity.AccountEntity;
import dev.shiperist.model.Account;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(config = QuarkusMappingConfig.class)
public interface AccountMapper {

    List<Account> toDomainList(List<AccountEntity> entities);

    Account toDomain(AccountEntity entity);

    @InheritInverseConfiguration(name = "toDomain")
    AccountEntity toEntity(Account domain);

    void updateEntityFromDomain(Account domain, @MappingTarget AccountEntity entity);

    void updateDomainFromEntity(AccountEntity entity, @MappingTarget Account domain);
}

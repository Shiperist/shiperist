package dev.shiperist.mapper.account;

import dev.shiperist.entity.account.AccountEntity;
import dev.shiperist.mapper.QuarkusMappingConfig;
import dev.shiperist.model.account.Account;
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

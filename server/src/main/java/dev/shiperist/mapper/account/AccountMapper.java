package dev.shiperist.mapper.account;

import dev.shiperist.entity.account.AccountEntity;
import dev.shiperist.mapper.QuarkusMappingConfig;
import dev.shiperist.model.account.Account;
import org.mapstruct.*;

import java.util.List;

@Mapper(config = QuarkusMappingConfig.class)
public interface AccountMapper {

    List<Account> toDomainList(List<AccountEntity> entities);

    @Mappings({
            @Mapping(target="userId", expression="java(entity.getUser().getId())")
    })
    Account toDomain(AccountEntity entity);

    @InheritInverseConfiguration(name = "toDomain")
    AccountEntity toEntity(Account domain);

    void updateEntityFromDomain(Account domain, @MappingTarget AccountEntity entity);

    void updateDomainFromEntity(AccountEntity entity, @MappingTarget Account domain);
}

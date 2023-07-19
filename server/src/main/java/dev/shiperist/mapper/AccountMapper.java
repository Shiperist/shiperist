package dev.shiperist.mapper;

import dev.shiperist.entity.AccountEntity;
import dev.shiperist.model.Account;
import org.mapstruct.Mapper;

@Mapper(componentModel = "jakarta")
public interface AccountMapper {

    AccountEntity toEntity(Account domain);

    Account toDomain(AccountEntity entity);
}

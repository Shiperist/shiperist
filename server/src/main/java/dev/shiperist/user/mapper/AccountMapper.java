package dev.shiperist.user.mapper;

import dev.shiperist.user.entity.AccountEntity;
import dev.shiperist.user.model.Account;
import org.mapstruct.Mapper;

@Mapper(componentModel = "jakarta")
public interface AccountMapper {

    AccountEntity toEntity(Account domain);

    Account toDomain(AccountEntity entity);
}

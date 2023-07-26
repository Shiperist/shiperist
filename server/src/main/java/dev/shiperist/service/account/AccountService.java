package dev.shiperist.service.account;

import dev.shiperist.entity.account.AccountEntity;
import dev.shiperist.mapper.account.AccountMapper;
import dev.shiperist.model.account.Account;
import dev.shiperist.repository.account.AccountRepository;
import io.quarkus.hibernate.reactive.panache.common.WithTransaction;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.Optional;

@ApplicationScoped
public class AccountService {

    @Inject
    AccountRepository accountRepository;

    @Inject
    AccountMapper accountMapper;

    @WithTransaction
    public Uni<Account> createAccount(Account account) {
        AccountEntity accountEntity = accountMapper.toEntity(account);
        return accountRepository.persist(accountEntity).map(accountMapper::toDomain);
    }

    public Uni<Optional<Account>> getAccount(Long id) {
        return accountRepository.findById(id)
                .map(accountMapper::toDomain)
                .map(Optional::of)
                .onItem().ifNull().continueWith(Optional.empty());
    }

    @WithTransaction
    public Uni<Account> updateAccount(Account account) {
        AccountEntity accountEntity = accountMapper.toEntity(account);
        return accountRepository.persist(accountEntity).map(accountMapper::toDomain);
    }

    @WithTransaction
    public Uni<Boolean> deleteAccount(Long accountId) {
        return accountRepository.deleteById(accountId);
    }
}

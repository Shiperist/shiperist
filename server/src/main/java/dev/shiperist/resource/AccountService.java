package dev.shiperist.resource;

import dev.shiperist.entity.AccountEntity;
import dev.shiperist.mapper.AccountMapper;
import dev.shiperist.model.Account;
import dev.shiperist.repository.AccountRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.Optional;

@ApplicationScoped
public class AccountService {

    @Inject
    AccountRepository accountRepository;

    @Inject
    AccountMapper accountMapper;

    @Transactional
    public Uni<Account> createAccount(Account account) {
        AccountEntity accountEntity = accountMapper.toEntity(account);
        return accountRepository.persist(accountEntity).map(accountMapper::toDomain);
    }

    @Transactional
    public Uni<Optional<Account>> getAccount(Long id) {
        return accountRepository.findById(id)
                .map(accountMapper::toDomain)
                .map(Optional::of)
                .onItem().ifNull().continueWith(Optional.empty());
    }

    @Transactional
    public Uni<Account> updateAccount(Account account) {
        AccountEntity accountEntity = accountMapper.toEntity(account);
        return accountRepository.persist(accountEntity).map(accountMapper::toDomain);
    }

    @Transactional
    public Uni<Boolean> deleteAccount(Long accountId) {
        return accountRepository.deleteById(accountId);
    }
}

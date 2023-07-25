package dev.shiperist.repository;

import dev.shiperist.entity.account.AccountEntity;
import io.quarkus.hibernate.reactive.panache.PanacheRepositoryBase;
import io.quarkus.hibernate.reactive.panache.common.WithSession;
import jakarta.enterprise.context.ApplicationScoped;

@WithSession
@ApplicationScoped
public class AccountRepository implements PanacheRepositoryBase<AccountEntity, Long> {
}

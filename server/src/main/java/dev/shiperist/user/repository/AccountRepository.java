package dev.shiperist.user.repository;

import dev.shiperist.user.entity.AccountEntity;
import io.quarkus.hibernate.reactive.panache.PanacheRepository;

public class AccountRepository implements PanacheRepository<AccountEntity> {
}

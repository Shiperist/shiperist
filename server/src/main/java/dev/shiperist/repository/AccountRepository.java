package dev.shiperist.repository;

import dev.shiperist.entity.AccountEntity;
import io.quarkus.hibernate.reactive.panache.PanacheRepository;

public class AccountRepository implements PanacheRepository<AccountEntity> {
}

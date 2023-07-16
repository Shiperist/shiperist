package dev.shiperist.user.entity;

import io.quarkus.hibernate.reactive.panache.PanacheEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@Entity
@Table(name = "session")
public class SessionEntity extends PanacheEntity {

    @Column(name = "session_token", unique = true)
    private String sessionToken;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "expires")
    private LocalDateTime expires;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private UserEntity user;

    public SessionEntity() {
    }
}

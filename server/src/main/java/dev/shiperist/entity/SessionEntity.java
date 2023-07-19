package dev.shiperist.entity;

import io.quarkus.hibernate.reactive.panache.PanacheEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "session")
@EqualsAndHashCode(callSuper = true)
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

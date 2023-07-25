package dev.shiperist.entity.account;

import io.quarkus.hibernate.reactive.panache.PanacheEntityBase;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@Data
@Entity(name = "Session")
@Table(name = "session", schema = "public")
@EqualsAndHashCode(callSuper = true)
public class SessionEntity extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "session_token", unique = true)
    private String sessionToken;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "expires")
    @Temporal(TemporalType.TIMESTAMP)
    private Date expires;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private UserEntity user;

    public SessionEntity() {
    }
}

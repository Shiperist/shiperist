package dev.shiperist.entity.account;

import io.quarkus.hibernate.reactive.panache.PanacheEntityBase;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Data
@Entity(name = "RefreshToken")
@Table(name = "refresh_token", schema = "public")
@EqualsAndHashCode(callSuper = true)
public class RefreshTokenEntity extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "token", unique = true, length = 1024)
    private String token;

    @Column(name = "revoked")
    private boolean revoked;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Date createdAt;

    @CreationTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;

    @ManyToOne(fetch = FetchType.EAGER)
    private UserEntity user;

    public RefreshTokenEntity() {
    }
}

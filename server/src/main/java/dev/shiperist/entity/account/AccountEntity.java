package dev.shiperist.entity.account;

import io.quarkus.hibernate.reactive.panache.PanacheEntityBase;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity(name = "Account")
@Table(name = "account", schema = "public")
@EqualsAndHashCode(callSuper = true)
public class AccountEntity extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "type")
    private String type;

    @Column(name = "provider")
    private String provider;

    @Column(name = "provider_account_id")
    private String providerAccountId;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "refresh_token_expires_in")
    private Integer refreshTokenExpiresIn;

    @Column(name = "access_token")
    private String accessToken;

    @Column(name = "expires_at")
    private Integer expiresAt;

    @Column(name = "token_type")
    private String tokenType;

    @Column(name = "scope")
    private String scope;

    @Column(name = "id_token")
    private String idToken;

    @Column(name = "session_state")
    private String sessionState;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private UserEntity user;

    public AccountEntity() {
    }
}

package dev.shiperist.entity.account;

import dev.shiperist.entity.project.ProjectEntity;
import io.quarkus.hibernate.reactive.panache.PanacheEntityBase;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;
import java.util.Set;

@Data
@Entity(name = "User")
@Table(name = "user", schema = "public")
@EqualsAndHashCode(callSuper = true)
public class UserEntity extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "email_verified")
    @Temporal(TemporalType.TIMESTAMP)
    private Date emailVerified;

    @Column(name = "image")
    private String image;

    @Column(name = "password")
    private String password;

    public UserEntity() {
    }
}

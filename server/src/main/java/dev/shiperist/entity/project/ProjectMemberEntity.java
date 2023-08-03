package dev.shiperist.entity.project;

import dev.shiperist.entity.account.UserEntity;
import io.quarkus.hibernate.reactive.panache.PanacheEntityBase;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity(name = "ProjectMember")
@Table(name = "project_member", schema = "public")
@EqualsAndHashCode(callSuper = true)
public class ProjectMemberEntity extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "role")
    private String role;

    @ManyToOne(fetch = FetchType.LAZY)
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    private ProjectEntity project;
}

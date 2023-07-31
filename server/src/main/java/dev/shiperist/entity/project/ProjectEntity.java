package dev.shiperist.entity.project;

import dev.shiperist.entity.account.UserEntity;
import io.quarkus.hibernate.reactive.panache.PanacheEntityBase;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Set;

@Data
@Entity(name = "Project")
@Table(name = "project", schema = "public")
@EqualsAndHashCode(callSuper = true)
public class ProjectEntity extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", unique = true)
    private String name;

    @Column(name = "display_name")
    private String displayName;

    @Column(name = "description")
    private String description;

    @Column(name = "image")
    private String image;

    @Column(name = "status")
    private String status;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private String createdAt;

    @Column(name = "members")
    @OneToMany(mappedBy = "project", fetch = FetchType.EAGER)
    private Set<ProjectMemberEntity> members;

    @OneToMany(mappedBy = "project", fetch = FetchType.EAGER)
    private Set<ProjectAppEntity> projectApps;
}

package dev.shiperist.entity.project;

import dev.shiperist.data.OsType;
import dev.shiperist.data.ReleaseType;
import io.quarkus.hibernate.reactive.panache.PanacheEntityBase;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Data
@Entity(name = "ProjectApp")
@Table(name = "project_app", schema = "public")
@EqualsAndHashCode(callSuper = true)
public class ProjectAppEntity extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", unique = true)
    private String name;

    @Column(name = "display_name", length = 128)
    private String displayName;

    @Column(name = "description", length = 1024)
    private String description;

    @Column(name = "image")
    private String image;

    @Column(name = "status")
    private String status;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Date createdAt;

    @CreationTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;

    @Column(name = "os")
    private OsType os;

    @Column(name = "release_type")
    private ReleaseType releaseType;

    @ManyToOne(fetch = FetchType.LAZY)
    private ProjectEntity project;
}

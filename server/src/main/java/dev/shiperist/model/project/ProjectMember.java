package dev.shiperist.model.project;

import lombok.Data;

@Data
public class ProjectMember {
    public Long id;
    private Long userId;
    private Long projectId;
    private String role;
}

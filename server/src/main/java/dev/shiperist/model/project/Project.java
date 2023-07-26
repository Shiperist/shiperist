package dev.shiperist.model.project;

import lombok.Data;

@Data
public class Project {
    public Long id;
    private String name;
    private String displayName;
    private String description;
    private String image;
    private String status;
    private String createdAt;
}

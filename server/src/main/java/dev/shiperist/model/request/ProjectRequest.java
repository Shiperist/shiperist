package dev.shiperist.model.request;

import lombok.Data;


@Data
public class ProjectRequest {
    private String name;
    private String displayName;
    private String description;
    private String image;
}

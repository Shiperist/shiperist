package dev.shiperist.model.project;

import dev.shiperist.data.OsType;
import dev.shiperist.data.ReleaseType;
import lombok.Data;

import java.util.Date;

@Data
public class ProjectApp {
    private Long id;
    private Long projectId;
    private String name;
    private String displayName;
    private String description;
    private String image;
    private String status;
    private Date createdAt;
    private Date updatedAt;
    private OsType os;
    private ReleaseType releaseType;

    //TODO Add appid and appsecret
}

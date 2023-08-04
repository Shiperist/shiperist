package dev.shiperist.app;

import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.security.TestSecurity;
import io.quarkus.test.security.jwt.Claim;
import io.quarkus.test.security.jwt.JwtSecurity;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

@QuarkusTest
public class UpdateEndpointTest extends BaseProjectAppResourceTest {

    @Test
    @DisplayName("PATCH /projects/{projectId}/apps/{appId} - update app")
    @TestSecurity(user = "app@test.com")
    @JwtSecurity(claims = {
            @Claim(key = "sub", value = "1")
    })
    public void testUpdateApp() {
        int appId = given()
                .contentType(ContentType.JSON)
                .body(app)
                .when().put("/projects/{projectId}/apps", project.getId())
                .then().statusCode(201)
                .body("name", equalTo(project.getName() + "/" + app.getName()),
                        "displayName", equalTo(app.getDisplayName()),
                        "description", equalTo(app.getDescription()),
                        "image", equalTo(app.getImage()),
                        "os", equalTo(app.getOs().name()),
                        "releaseType", equalTo(app.getReleaseType().name()))
                .extract().body().jsonPath().getInt("id");

        app.setName("newName");
        app.setDisplayName("newDisplayName");
        app.setDescription("newDescription");
        app.setImage("newImage");

        given()
                .contentType(ContentType.JSON)
                .body(app)
                .when().patch("/projects/{projectId}/apps/{appId}", project.getId(), appId)
                .then().statusCode(200)
                .body("name", equalTo(project.getName() + "/" + app.getName()),
                        "displayName", equalTo(app.getDisplayName()),
                        "description", equalTo(app.getDescription()),
                        "image", equalTo(app.getImage()),
                        "os", equalTo(app.getOs().name()),
                        "releaseType", equalTo(app.getReleaseType().name()));
    }
}

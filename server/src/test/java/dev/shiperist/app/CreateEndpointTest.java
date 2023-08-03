package dev.shiperist.app;

import dev.shiperist.exception.ErrorMessage;
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
public class CreateEndpointTest extends BaseProjectAppResourceTest {

    @Test
    @DisplayName("PUT /projects/{projectId}/apps - create app")
    @TestSecurity(user = "app@test.com")
    @JwtSecurity(claims = {
            @Claim(key = "sub", value = "1")
    })
    public void testCreateApp() {
        given()
                .contentType(ContentType.JSON)
                .body(app)
                .when().put("/projects/{projectId}/apps", project.getId())
                .then().statusCode(201)
                .body("name", equalTo(project.getName() + "/" + app.getName()),
                        "displayName", equalTo(app.getDisplayName()),
                        "description", equalTo(app.getDescription()),
                        "image", equalTo(app.getImage()),
                        "os", equalTo(app.getOs().name()),
                        "releaseType", equalTo(app.getReleaseType().name()));
    }

    @Test
    @DisplayName("PUT /projects/{projectId}/apps - create app - unauthorized")
    public void testCreateAppUnauthorized() {
        given()
                .contentType(ContentType.JSON)
                .body(app)
                .when().put("/projects/{projectId}/apps", project.getId())
                .then().statusCode(401);
    }

    @Test
    @DisplayName("PUT /projects/{projectId}/apps - create app - already exists")
    @TestSecurity(user = "app@test.com")
    @JwtSecurity(claims = {
            @Claim(key = "sub", value = "1")
    })
    public void testCreateAppAlreadyExists() {
        given()
                .contentType(ContentType.JSON)
                .body(app)
                .when().put("/projects/{projectId}/apps", project.getId())
                .then().statusCode(201);

        given()
                .contentType(ContentType.JSON)
                .body(app)
                .when().put("/projects/{projectId}/apps", project.getId())
                .then().statusCode(400)
                .body("error", equalTo(ErrorMessage.PROJECT_APP_ALREADY_EXISTS.getError()),
                        "description", equalTo(ErrorMessage.PROJECT_APP_ALREADY_EXISTS.getDescription()));
    }
}

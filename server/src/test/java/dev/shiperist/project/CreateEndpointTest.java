package dev.shiperist.project;

import dev.shiperist.model.request.ProjectRequest;
import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.security.TestSecurity;
import io.quarkus.test.security.jwt.Claim;
import io.quarkus.test.security.jwt.JwtSecurity;
import io.restassured.http.ContentType;
import org.instancio.Instancio;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.instancio.Select.field;

@QuarkusTest
public class CreateEndpointTest extends BaseProjectResourceTest {

    @Test
    @DisplayName("PUT /projects - create project")
    @TestSecurity(user = "project@test.com")
    @JwtSecurity(claims = {
            @Claim(key = "sub", value = "1")
    })
    public void testCreateProject() {
        ProjectRequest request = Instancio.of(ProjectRequest.class)
                .generate(field(ProjectRequest::getName), gen -> gen.text().uuid())
                .generate(field(ProjectRequest::getDisplayName), gen -> gen.text().uuid())
                .generate(field(ProjectRequest::getDescription), gen -> gen.text().loremIpsum().paragraphs(3))
                .generate(field(ProjectRequest::getImage), gen -> gen.net().url().asString())
                .create();

        given()
                .contentType(ContentType.JSON)
                .body(request)
                .when().put("/projects")
                .then().statusCode(201)
                .body("name", equalTo(request.getName()),
                        "displayName", equalTo(request.getDisplayName()),
                        "description", equalTo(request.getDescription()),
                        "image", equalTo(request.getImage()));
    }

    @Test
    @DisplayName("PUT /projects - create project - unauthorized")
    public void testCreateProjectUnauthorized() {
        ProjectRequest request = Instancio.of(ProjectRequest.class)
                .generate(field(ProjectRequest::getName), gen -> gen.text().uuid())
                .generate(field(ProjectRequest::getDisplayName), gen -> gen.text().uuid())
                .generate(field(ProjectRequest::getDescription), gen -> gen.text().loremIpsum().paragraphs(3))
                .generate(field(ProjectRequest::getImage), gen -> gen.net().url().asString())
                .create();

        given()
                .contentType(ContentType.JSON)
                .body(request)
                .when().put("/projects")
                .then().statusCode(401);
    }

    @Test
    @DisplayName("PUT /projects - create project - already exists")
    @TestSecurity(user = "project@test.com")
    @JwtSecurity(claims = {
            @Claim(key = "sub", value = "1")
    })
    public void testCreateProjectAlreadyExists() {
        ProjectRequest request = Instancio.of(ProjectRequest.class)
                .generate(field(ProjectRequest::getName), gen -> gen.text().uuid())
                .generate(field(ProjectRequest::getDisplayName), gen -> gen.text().uuid())
                .generate(field(ProjectRequest::getDescription), gen -> gen.text().loremIpsum().paragraphs(3))
                .generate(field(ProjectRequest::getImage), gen -> gen.net().url().asString())
                .create();

        given()
                .contentType(ContentType.JSON)
                .body(request)
                .when().put("/projects")
                .then().statusCode(201)
                .body("name", equalTo(request.getName()),
                        "displayName", equalTo(request.getDisplayName()),
                        "description", equalTo(request.getDescription()),
                        "image", equalTo(request.getImage()));

        given()
                .contentType(ContentType.JSON)
                .body(request)
                .when().put("/projects")
                .then().statusCode(400);
    }
}

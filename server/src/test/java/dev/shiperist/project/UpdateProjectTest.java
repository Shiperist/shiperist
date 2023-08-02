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
public class UpdateProjectTest extends BaseProjectResourceTest {

    @Test
    @DisplayName("PATCH /projects - update project")
    @TestSecurity(user = "project@test.com")
    @JwtSecurity(claims = {
            @Claim(key = "sub", value = "1")
    })
    public void testUpdateProject() {
        ProjectRequest request = Instancio.of(ProjectRequest.class)
                .generate(field(ProjectRequest::getName), gen -> gen.text().uuid())
                .generate(field(ProjectRequest::getDisplayName), gen -> gen.text().uuid())
                .generate(field(ProjectRequest::getDescription), gen -> gen.text().loremIpsum().paragraphs(3))
                .generate(field(ProjectRequest::getImage), gen -> gen.net().url().asString())
                .create();

        int projectId = given()
                .contentType(ContentType.JSON)
                .body(request)
                .when().put("/projects")
                .then().statusCode(201)
                .body("name", equalTo(request.getName()),
                        "displayName", equalTo(request.getDisplayName()),
                        "description", equalTo(request.getDescription()),
                        "image", equalTo(request.getImage()))
                .extract().body().jsonPath().getInt("id");

        request = Instancio.of(ProjectRequest.class)
                .generate(field(ProjectRequest::getName), gen -> gen.text().uuid())
                .generate(field(ProjectRequest::getDisplayName), gen -> gen.text().uuid())
                .generate(field(ProjectRequest::getDescription), gen -> gen.text().loremIpsum().paragraphs(3))
                .generate(field(ProjectRequest::getImage), gen -> gen.net().url().asString())
                .create();

        given()
                .contentType(ContentType.JSON)
                .body(request)
                .when().patch("/projects/" + projectId)
                .then().statusCode(200)
                .body("name", equalTo(request.getName()),
                        "displayName", equalTo(request.getDisplayName()),
                        "description", equalTo(request.getDescription()),
                        "image", equalTo(request.getImage()));
    }

    @Test
    @DisplayName("PATCH /projects - update project - does not exist")
    @TestSecurity(user = "project@test.com")
    @JwtSecurity(claims = {
            @Claim(key = "sub", value = "1")
    })
    public void testUpdateProjectDoesNotExist() {
        ProjectRequest request = Instancio.of(ProjectRequest.class)
                .generate(field(ProjectRequest::getName), gen -> gen.text().uuid())
                .generate(field(ProjectRequest::getDisplayName), gen -> gen.text().uuid())
                .generate(field(ProjectRequest::getDescription), gen -> gen.text().loremIpsum().paragraphs(3))
                .generate(field(ProjectRequest::getImage), gen -> gen.net().url().asString())
                .create();

        given()
                .contentType(ContentType.JSON)
                .body(request)
                .when().patch("/projects/999999999")
                .then().statusCode(404);
    }

    @Test
    @DisplayName("PATCH /projects - update project - not unique name")
    @TestSecurity(user = "project@test.com")
    @JwtSecurity(claims = {
            @Claim(key = "sub", value = "1")
    })
    public void testUpdateProjectNotUniqueName() {
        ProjectRequest request = Instancio.of(ProjectRequest.class)
                .generate(field(ProjectRequest::getName), gen -> gen.text().uuid())
                .generate(field(ProjectRequest::getDisplayName), gen -> gen.text().uuid())
                .generate(field(ProjectRequest::getDescription), gen -> gen.text().loremIpsum().paragraphs(3))
                .generate(field(ProjectRequest::getImage), gen -> gen.net().url().asString())
                .create();

        String name = given()
                .contentType(ContentType.JSON)
                .body(request)
                .when().put("/projects")
                .then().statusCode(201)
                .body("name", equalTo(request.getName()),
                        "displayName", equalTo(request.getDisplayName()),
                        "description", equalTo(request.getDescription()),
                        "image", equalTo(request.getImage()))
                .extract().body().jsonPath().getString("name");

        request = Instancio.of(ProjectRequest.class)
                .generate(field(ProjectRequest::getName), gen -> gen.text().uuid())
                .generate(field(ProjectRequest::getDisplayName), gen -> gen.text().uuid())
                .generate(field(ProjectRequest::getDescription), gen -> gen.text().loremIpsum().paragraphs(3))
                .generate(field(ProjectRequest::getImage), gen -> gen.net().url().asString())
                .create();

        int projectId = given()
                .contentType(ContentType.JSON)
                .body(request)
                .when().put("/projects")
                .then().statusCode(201)
                .body("name", equalTo(request.getName()),
                        "displayName", equalTo(request.getDisplayName()),
                        "description", equalTo(request.getDescription()),
                        "image", equalTo(request.getImage()))
                .extract().body().jsonPath().getInt("id");

        request.setName(name);

        given()
                .contentType(ContentType.JSON)
                .body(request)
                .when().patch("/projects/" + projectId)
                .then().statusCode(400);
    }
}

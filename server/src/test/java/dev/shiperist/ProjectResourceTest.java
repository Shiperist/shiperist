package dev.shiperist;

import dev.shiperist.model.account.User;
import dev.shiperist.model.request.ProjectRequest;
import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.security.TestSecurity;
import io.quarkus.test.security.jwt.Claim;
import io.quarkus.test.security.jwt.JwtSecurity;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

@QuarkusTest
public class ProjectResourceTest {

    @Test
    @TestSecurity(user = "testUser")
    @JwtSecurity(claims = {
            @Claim(key = "sub", value = "1")
    })
    public void testCreateProject() {
        User user = new User();
        user.setName("testUser");
        user.setEmail("test@test.com");
        user.setImage("test");
        user.setPassword("test");

        given()
                .contentType(ContentType.JSON)
                .body(user)
                .when().post("/auth/signup")
                .then().statusCode(201)
                .body("name", equalTo(user.getName()),
                        "email", equalTo(user.getEmail()),
                        "image", equalTo(user.getImage()));

        ProjectRequest request = new ProjectRequest();
        request.setName("test");
        request.setDisplayName("test");
        request.setDescription("test");
        request.setImage("test");

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
}

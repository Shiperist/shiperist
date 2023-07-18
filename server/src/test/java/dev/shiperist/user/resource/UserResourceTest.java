package dev.shiperist.user.resource;

import dev.shiperist.user.model.request.CreateUserRequest;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.is;

@QuarkusTest
public class UserResourceTest {

    private Jsonb jsonb = JsonbBuilder.create();

    @Test
    public void testCreateUserEndpoint() {
        CreateUserRequest request = new CreateUserRequest();
        request.setName("Test User");
        request.setEmail("test.user@example.com");
        request.setIsEmailVerified(LocalDateTime.now());
        request.setImage("http://example.com/image.jpg");

        String requestBody = jsonb.toJson(request);

        given()
                .body(requestBody)
                .header("Content-Type", ContentType.JSON)
                .when().post("/create")
                .then()
                .statusCode(200)
                .body("name", is(request.getName()))
                .body("email", is(request.getEmail()));
    }
}

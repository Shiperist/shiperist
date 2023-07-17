package dev.shiperist.user.resource;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;

@QuarkusTest
public class UserResourceTest {

    @Test
    void createUser() {
        String userCreateRequest = """
                {
                    "name": "test",
                    "email": "test@test.com",
                    "isEmailVerified": true,
                    "image": "test"
                }
                """;

        given()
                .when()
                .body(userCreateRequest)
                .post("/user/create")
                .then()
                .statusCode(200);
    }
}

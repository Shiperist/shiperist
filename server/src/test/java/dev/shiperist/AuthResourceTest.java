package dev.shiperist;

import dev.shiperist.model.User;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

@QuarkusTest
class AuthResourceTest {

    @Test
    public void testGetSettings() {
        given()
                .when().get("/auth/settings")
                .then().statusCode(200);
    }

    @Test
    public void testSignUp() {
        User user = new User();
        user.setName("test");
        user.setEmail("test@example.com");
        user.setImage("testImage");
        user.setPassword("testPassword");

        given()
                .contentType(ContentType.JSON)
                .body(user)
                .when().post("/auth/signup")
                .then().statusCode(200)
                .body("name", equalTo(user.getName()),
                        "email", equalTo(user.getEmail()),
                        "image", equalTo(user.getImage()));
    }
}

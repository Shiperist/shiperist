package dev.shiperist.auth;

import dev.shiperist.exception.ErrorMessage;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.notNullValue;

@QuarkusTest
public class SignUpEndpointTest extends BaseAuthResourceTest {

    @Test
    @DisplayName("POST /auth/signup")
    public void testSignUp() {
        given()
                .contentType(ContentType.JSON)
                .body(user)
                .when().post("/auth/signup")
                .then().statusCode(201)
                .body("name", equalTo(user.getName()),
                        "email", equalTo(user.getEmail()),
                        "image", equalTo(user.getImage()));
    }

    @Test
    @DisplayName("POST /auth/token - duplicate email")
    public void testDuplicate() {
        given()
                .contentType(ContentType.JSON)
                .body(user)
                .when().post("/auth/signup")
                .then().statusCode(201)
                .body("name", equalTo(user.getName()),
                        "email", equalTo(user.getEmail()),
                        "image", equalTo(user.getImage()));

        given()
                .contentType(ContentType.JSON)
                .body(user)
                .when().post("/auth/signup")
                .then().statusCode(400)
                .body("error", equalTo(ErrorMessage.EMAIL_ALREADY_EXISTS.getError()),
                        "description", equalTo(ErrorMessage.EMAIL_ALREADY_EXISTS.getDescription()));
    }
}

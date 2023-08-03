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
public class TokenEndpointTest extends BaseAuthResourceTest {

    @Test
    @DisplayName("POST /auth/token")
    public void testRefreshToken() {
        given()
                .contentType(ContentType.JSON)
                .body(user)
                .when().post("/auth/signup")
                .then().statusCode(201)
                .body("name", equalTo(user.getName()),
                        "email", equalTo(user.getEmail()),
                        "image", equalTo(user.getImage()));

        String refreshToken = given()
                .formParam("grant_type", "password")
                .formParam("email", user.getEmail())
                .formParam("password", user.getPassword())
                .when().post("/auth/token")
                .then().statusCode(200)
                .body("accessToken", notNullValue(),
                        "tokenType", equalTo("bearer"),
                        "expiresIn", notNullValue(),
                        "refreshToken", notNullValue())
                .extract().path("refreshToken");

        given()
                .formParam("grant_type", "refresh_token")
                .formParam("refresh_token", refreshToken)
                .when().post("/auth/token")
                .then().statusCode(200)
                .body("accessToken", notNullValue(),
                        "tokenType", equalTo("bearer"),
                        "expiresIn", notNullValue(),
                        "refreshToken", notNullValue());
    }

    @Test
    @DisplayName("POST /auth/token - no user")
    public void testNoUser() {
        given()
                .formParam("grant_type", "password")
                .formParam("email", user.getEmail())
                .formParam("password", user.getPassword())
                .when().post("/auth/token")
                .then().statusCode(401)
                .body("error", equalTo(ErrorMessage.INVALID_CREDENTIALS.getError()),
                        "description", equalTo(ErrorMessage.INVALID_CREDENTIALS.getDescription()));
    }

    @Test
    @DisplayName("POST /auth/token - invalid grant type")
    public void testInvalidGrantType() {
        given()
                .formParam("grant_type", "invalid")
                .formParam("email", user.getEmail())
                .formParam("password", user.getPassword())
                .when().post("/auth/token")
                .then().statusCode(400)
                .body("error", equalTo(ErrorMessage.INVALID_GRANT_TYPE.getError()),
                        "description", equalTo(ErrorMessage.INVALID_GRANT_TYPE.getDescription()));
    }

    @Test
    @DisplayName("POST /auth/token - invalid refresh token")
    public void testInvalidRefreshToken() {
        given()
                .formParam("grant_type", "refresh_token")
                .formParam("refresh_token", "invalid")
                .when().post("/auth/token")
                .then().statusCode(400)
                .body("error", equalTo(ErrorMessage.INVALID_REFRESH_TOKEN.getError()),
                        "description", equalTo(ErrorMessage.INVALID_REFRESH_TOKEN.getDescription()));
    }
}

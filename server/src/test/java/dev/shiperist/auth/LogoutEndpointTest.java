package dev.shiperist.auth;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.notNullValue;

@QuarkusTest
public class LogoutEndpointTest extends BaseAuthResourceTest{

    @Test
    @DisplayName("POST /auth/logout")
    public void testLogout() {
        given()
                .contentType(ContentType.JSON)
                .body(user)
                .when().post("/auth/signup")
                .then().statusCode(201)
                .body("name", equalTo(user.getName()),
                        "email", equalTo(user.getEmail()),
                        "image", equalTo(user.getImage()));

        String accessToken = given()
                .formParam("grant_type", "password")
                .formParam("email", user.getEmail())
                .formParam("password", user.getPassword())
                .when().post("/auth/token")
                .then().statusCode(200)
                .body("accessToken", notNullValue(),
                        "tokenType", equalTo("bearer"),
                        "expiresIn", notNullValue(),
                        "refreshToken", notNullValue())
                .extract().path("accessToken");

        given()
                .header("Authorization", "Bearer " + accessToken)
                .when().head("/auth/logout")
                .then().statusCode(200);
    }

    @Test
    @DisplayName("POST /auth/logout - no token")
    public void testLogoutNoToken() {
        given()
                .when().head("/auth/logout")
                .then().statusCode(401);
    }
}

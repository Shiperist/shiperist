package dev.shiperist;

import dev.shiperist.model.account.User;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.instancio.Instancio;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.notNullValue;
import static org.instancio.Select.field;

@QuarkusTest
class AuthResourceTest {

    private User user;

    @BeforeEach
    public void setUp() {
        user = Instancio.of(User.class)
                .generate(field(User::getName, gen -> gen.name().fullName()))
                .create();
    }

    @Test
    public void testGetSettings() {
        given()
                .when().get("/auth/settings")
                .then().statusCode(200);
    }

    @Test
    public void testSignUp() {
        given()
                .contentType(ContentType.JSON)
                .body(USER)
                .when().post("/auth/signup")
                .then().statusCode(200)
                .body("name", equalTo(USER.getName()),
                        "email", equalTo(USER.getEmail()),
                        "image", equalTo(USER.getImage()));
    }

    @Test
    public void testToken() {
        given()
                .contentType(ContentType.JSON)
                .body(USER)
                .when().post("/auth/signup")
                .then().statusCode(200)
                .body("name", equalTo(USER.getName()),
                        "email", equalTo(USER.getEmail()),
                        "image", equalTo(USER.getImage()));

        given()
                .formParam("grant_type", "password")
                .formParam("email", USER.getEmail())
                .formParam("password", USER.getPassword())
                .when().post("/auth/token")
                .then().statusCode(200)
                .body("accessToken", notNullValue(),
                        "tokenType", equalTo("bearer"),
                        "expiresIn", notNullValue(),
                        "refreshToken", notNullValue());
    }
}

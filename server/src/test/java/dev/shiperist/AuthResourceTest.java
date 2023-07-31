package dev.shiperist;

import dev.shiperist.model.account.User;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.instancio.Instancio;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

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
                .generate(field(User::getName), gen -> gen.text().uuid())
                .generate(field(User::getEmail), gen -> gen.text().pattern("[a-z]{5}@test.com"))
                .generate(field(User::getImage), gen -> gen.net().url())
                .generate(field(User::getPassword), gen -> gen.text().uuid())
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
                .body(user)
                .when().post("/auth/signup")
                .then().statusCode(200)
                .body("name", equalTo(user.getName()),
                        "email", equalTo(user.getEmail()),
                        "image", equalTo(user.getImage()));
    }

    @Test
    public void testToken() {
        given()
                .contentType(ContentType.JSON)
                .body(user)
                .when().post("/auth/signup")
                .then().statusCode(200)
                .body("name", equalTo(user.getName()),
                        "email", equalTo(user.getEmail()),
                        "image", equalTo(user.getImage()));

        given()
                .formParam("grant_type", "password")
                .formParam("email", user.getEmail())
                .formParam("password", user.getPassword())
                .when().post("/auth/token")
                .then().statusCode(200)
                .body("accessToken", notNullValue(),
                        "tokenType", equalTo("bearer"),
                        "expiresIn", notNullValue(),
                        "refreshToken", notNullValue());
    }
}

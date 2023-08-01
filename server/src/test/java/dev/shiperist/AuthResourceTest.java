package dev.shiperist;

import dev.shiperist.exception.ErrorMessage;
import dev.shiperist.model.account.User;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.instancio.Instancio;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
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
                .generate(field(User::getEmail), gen -> gen.text().pattern("#a#a#a#a#a@test.com"))
                .generate(field(User::getImage), gen -> gen.net().url().asString())
                .generate(field(User::getPassword), gen -> gen.text().uuid())
                .ignore(field(User::getId))
                .ignore(field(User::getEmailVerified))
                .create();
    }

    @Test
    @DisplayName("GET /auth/settings")
    public void testGetSettings() {
        given()
                .when().get("/auth/settings")
                .then().statusCode(200);
    }

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
    @DisplayName("POST /auth/signup - email already exists")
    public void testToken() {
        given()
                .contentType(ContentType.JSON)
                .body(user)
                .when().post("/auth/signup")
                .then().statusCode(201)
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

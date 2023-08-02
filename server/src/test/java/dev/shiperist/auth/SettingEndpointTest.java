package dev.shiperist.auth;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;

@QuarkusTest
public class SettingEndpointTest {

    @Test
    @DisplayName("GET /auth/settings")
    public void testGetSettings() {
        given()
                .when().get("/auth/settings")
                .then().statusCode(200);
    }
}

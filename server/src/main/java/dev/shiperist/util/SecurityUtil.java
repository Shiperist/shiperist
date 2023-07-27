package dev.shiperist.util;

import dev.shiperist.model.account.User;
import io.smallrye.jwt.build.Jwt;
import org.eclipse.microprofile.jwt.Claims;

import java.util.Date;
import java.util.UUID;

public class SecurityUtil {

    public static String generateToken(User user, Date expires) {
        return Jwt.issuer("https://example.com/issuer")
                .upn(user.getEmail())
                .claim(Claims.sub.name(), user.getId().toString())
                .sign();
    }

    //TODO - Better generation
    public static String generateRefreshToken() {
        return UUID.randomUUID().toString();
    }
}

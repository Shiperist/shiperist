package dev.shiperist.user.resource;

import dev.shiperist.user.entity.UserEntity;
import dev.shiperist.user.model.User;
import dev.shiperist.user.model.request.CreateUserRequest;
import dev.shiperist.user.repository.UserRepository;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

@Path("/user")
public class UserResource {

    @Inject
    UserRepository userRepository;

    @GET
    public Uni<User> createUser(CreateUserRequest request) {
        UserEntity.UserEntityBuilder builder = UserEntity.builder();
        builder.name(request.getName());
        builder.email(request.getEmail());
        builder.emailVerified(request.getIsEmailVerified());
        builder.image(request.getImage());

        return userRepository.persist(builder.build()).map(User::new);
    }
}

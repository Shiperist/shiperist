package dev.shiperist.service.account;

import at.favre.lib.crypto.bcrypt.BCrypt;
import dev.shiperist.entity.account.UserEntity;
import dev.shiperist.mapper.account.UserMapper;
import dev.shiperist.model.account.User;
import dev.shiperist.repository.account.UserRepository;
import io.quarkus.hibernate.reactive.panache.common.WithTransaction;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.Optional;

@ApplicationScoped
public class UserService {

    @Inject
    UserRepository userRepository;

    @Inject
    UserMapper userMapper;

    @WithTransaction
    public Uni<User> createUser(String name, String email, String image, String password) {
        UserEntity user = new UserEntity();
        user.setName(name);
        user.setEmail(email);
        user.setImage(image);
        user.setPassword(hashPassword(password));
        return userRepository.persist(user)
                .map(userMapper::toDomain);
    }

    public Uni<Optional<User>> getUser(Long id) {
        return userRepository.findById(id).map(user -> Optional.ofNullable(userMapper.toDomain(user)));
    }

    public Uni<Optional<User>> getUserByEmail(String email) {
        return userRepository.findByEmail(email).map(user -> Optional.ofNullable(userMapper.toDomain(user)));
    }

    @WithTransaction
    public Uni<User> updateUser(User user) {
        UserEntity userEntity = userMapper.toEntity(user);
        return userRepository.persist(userEntity).map(userMapper::toDomain);
    }

    @WithTransaction
    public Uni<Boolean> deleteUser(Long userId) {
        return userRepository.deleteById(userId);
    }

    public boolean checkPassword(String plainText, String hashed) {
        BCrypt.Result result = BCrypt.verifyer().verify(plainText.toCharArray(), hashed);
        return result.verified;
    }

    private String hashPassword(String password) {
        return BCrypt.withDefaults().hashToString(12, password.toCharArray());
    }
}

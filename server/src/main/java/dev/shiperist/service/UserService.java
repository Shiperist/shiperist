package dev.shiperist.service;

import at.favre.lib.crypto.bcrypt.BCrypt;
import dev.shiperist.entity.UserEntity;
import dev.shiperist.mapper.UserMapper;
import dev.shiperist.model.User;
import dev.shiperist.repository.UserRepository;
import io.quarkus.hibernate.reactive.panache.common.WithSession;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.Optional;

@WithSession
@ApplicationScoped
public class UserService {

    @Inject
    UserRepository userRepository;

    @Inject
    UserMapper userMapper;

    @Transactional
    public Uni<User> createUser(String name, String email, String image, String password) {
        UserEntity user = new UserEntity();
        user.setName(name);
        user.setEmail(email);
        user.setImage(image);
        user.setPassword(hashPassword(password));
        return userRepository.persist(user).map(userMapper::toDomain);
    }

    @Transactional
    public Uni<Optional<User>> getUser(Long id) {
        return userRepository.findById(id).map(user -> Optional.ofNullable(userMapper.toDomain(user)));
    }

    @Transactional
    public Uni<Optional<User>> getUserByEmail(String email) {
        return userRepository.findByEmail(email).map(user -> Optional.ofNullable(userMapper.toDomain(user)));
    }

    @Transactional
    public Uni<User> updateUser(User user) {
        UserEntity userEntity = userMapper.toEntity(user);
        return userRepository.persist(userEntity).map(userMapper::toDomain);
    }

    @Transactional
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

package dev.shiperist.resource;

import dev.shiperist.entity.UserEntity;
import dev.shiperist.mapper.UserMapper;
import dev.shiperist.model.User;
import dev.shiperist.repository.UserRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.Optional;

@ApplicationScoped
public class UserService {

    @Inject
    UserRepository userRepository;

    @Inject
    UserMapper userMapper;

    @Transactional
    public Uni<User> createUser(User user) {
        UserEntity userEntity = userMapper.toEntity(user);
        return userRepository.persist(userEntity).map(userMapper::toDomain);
    }

    @Transactional
    public Uni<Optional<User>> getUser(Long id) {
        return userRepository.findById(id)
                .map(userMapper::toDomain)
                .map(Optional::of)
                .onItem().ifNull().continueWith(Optional.empty());
    }

    @Transactional
    public Uni<Optional<User>> getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(userMapper::toDomain)
                .map(Optional::of)
                .onItem().ifNull().continueWith(Optional.empty());
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
}

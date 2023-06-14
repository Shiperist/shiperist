package com.heligion.user.service;

import com.heligion.user.dto.UserUpdateRequest;
import com.heligion.user.model.User;

public interface UserService {

    User currentUser();

    User updateUser(UserUpdateRequest request);
}

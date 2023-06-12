package com.heligion.user.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserUpdateRequest {
    private final String displayName;
    private final String avatarUrl;
    private final String firstName;
    private final String lastName;
    private final String address;
    private final String phone;
}

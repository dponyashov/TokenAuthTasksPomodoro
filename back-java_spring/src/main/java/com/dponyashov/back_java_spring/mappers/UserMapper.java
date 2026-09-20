package com.dponyashov.back_java_spring.mappers;

import com.dponyashov.back_java_spring.dto.user.UserDto;
import com.dponyashov.back_java_spring.entity.UserEntity;

public class UserMapper {
    public static UserDto entityToDto(UserEntity entity) {
        return UserDto.builder()
                .id(entity.getId())
                .userName(entity.getUserName())
                .firstName(entity.getFirstName())
                .lastName(entity.getLastName())
                .build();
    }

    public static UserEntity dtoToEntity(UserDto dto) {
        return UserEntity.builder()
                .id(dto.getId())
                .userName(dto.getUserName())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .build();
    }
}

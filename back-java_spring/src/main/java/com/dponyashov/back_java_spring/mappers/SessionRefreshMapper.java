package com.dponyashov.back_java_spring.mappers;

import com.dponyashov.back_java_spring.dto.sessions.SessionRefreshDto;
import com.dponyashov.back_java_spring.entity.SessionRefreshEntity;

public class SessionRefreshMapper {
    public static SessionRefreshDto entityToDto(SessionRefreshEntity entity) {
        return SessionRefreshDto.builder()
                .id(entity.getId())
                .userId(entity.getUserId())
                .created(entity.getCreated())
                .expired(entity.getExpired())
                .isDeleted(entity.isDeleted())
                .build();
    }

    public static SessionRefreshEntity dtoToEntity(SessionRefreshDto dto) {
        return SessionRefreshEntity.builder()
                .id(dto.getId())
                .userId(dto.getUserId())
                .created(dto.getCreated())
                .expired(dto.getExpired())
                .isDeleted(dto.isDeleted())
                .build();
    }
}

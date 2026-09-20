package com.dponyashov.back_java_spring.mappers;

import com.dponyashov.back_java_spring.dto.sessions.SessionDto;
import com.dponyashov.back_java_spring.entity.SessionEntity;

public class SessionMapper {
    public static SessionDto entityToDto(SessionEntity entity) {
        return SessionDto.builder()
                .id(entity.getId())
                .userId(entity.getUserId())
                .refresh(entity.getRefresh())
                .created(entity.getCreated())
                .expired(entity.getExpired())
                .isDeleted(entity.isDeleted())
                .build();
    }

    public static SessionEntity dtoToEntity(SessionDto dto) {
        return SessionEntity.builder()
                .id(dto.getId())
                .userId(dto.getUserId())
                .refresh(dto.getRefresh())
                .created(dto.getCreated())
                .expired(dto.getExpired())
                .isDeleted(dto.isDeleted())
                .build();
    }
}

package com.dponyashov.back_java_spring.services;

import com.dponyashov.back_java_spring.dto.sessions.SessionDto;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.UUID;

@Service
public interface SessionService {
    Collection<SessionDto> findAll();
    SessionDto findById(UUID id);
    Collection<SessionDto> findByUserId(Long userId);
    SessionDto save(SessionDto session);
    void delete(UUID id);
    void deleteWithRefresh(UUID refreshToken);
    Collection<SessionDto> findByRefreshId(UUID uuid);
}

package com.dponyashov.back_java_spring.services;

import com.dponyashov.back_java_spring.dto.sessions.SessionRefreshDto;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.UUID;

@Service
public interface SessionRefreshService {
    Collection<SessionRefreshDto> findAll();
    SessionRefreshDto findById(UUID id);
    SessionRefreshDto save(SessionRefreshDto session);
    void delete(UUID id);

    Long getUserIdByToken(UUID id);
}

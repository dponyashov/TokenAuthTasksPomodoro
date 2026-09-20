package com.dponyashov.back_java_spring.services.impl;

import com.dponyashov.back_java_spring.dto.sessions.SessionRefreshDto;
import com.dponyashov.back_java_spring.exceptions.NotFountException;
import com.dponyashov.back_java_spring.mappers.SessionRefreshMapper;
import com.dponyashov.back_java_spring.repository.SessionRefreshRepository;
import com.dponyashov.back_java_spring.services.SessionRefreshService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.UUID;

@Service
@AllArgsConstructor
@Log4j2
public class SessionRefreshServiceImpl implements SessionRefreshService {
    private final SessionRefreshRepository sessionRepository;

    @Override
    public Collection<SessionRefreshDto> findAll() {
        return sessionRepository.findAll().stream()
                .filter(session -> !session.isDeleted())
                .map(SessionRefreshMapper::entityToDto)
                .toList();
    }

    @Override
    public SessionRefreshDto findById(UUID id) {
        var selectedSession = sessionRepository.findById(id);
        return selectedSession.map(SessionRefreshMapper::entityToDto)
                .orElseThrow(()-> new NotFountException("Сессия не найдена!"));
    }

    @Override
    public SessionRefreshDto save(SessionRefreshDto session) {
        var savedSession = sessionRepository.save(SessionRefreshMapper.dtoToEntity(session));

       log.info("\nSessionRefreshServiceImpl.save\n");
//        sessionRepository.findAll().forEach(sessionEntity -> System.out.printf("\n%s",sessionEntity.toString()));

        return SessionRefreshMapper.entityToDto(savedSession);
//        return savedSession.map(SessionRefreshMapper::entityToDto)
//                .orElseThrow(() -> new SaveErrorException("Сессию не удалось сохранить!"));
    }

    @Override
    public void delete(UUID id) {
        var session = findById(id);
//        sessionRepository.delete(SessionRefreshMapper.dtoToEntity(session));
        var deletedSession = SessionRefreshMapper.dtoToEntity(session);
        deletedSession.setDeleted(true);
        sessionRepository.save(deletedSession);

        log.info("\nSessionRefreshServiceImpl.delete\n");
//        sessionRepository.findAll().forEach(sessionEntity -> System.out.printf("\n%s",sessionEntity.toString()));
    }

    @Override
    public Long getUserIdByToken(UUID id) {
        var session = findById(id);
        return session.getUserId();
    }
}

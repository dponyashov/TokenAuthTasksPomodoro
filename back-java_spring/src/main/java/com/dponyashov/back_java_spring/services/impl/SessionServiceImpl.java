package com.dponyashov.back_java_spring.services.impl;

import com.dponyashov.back_java_spring.dto.sessions.SessionDto;
import com.dponyashov.back_java_spring.dto.sessions.SessionRefreshDto;
import com.dponyashov.back_java_spring.exceptions.NotFountException;
import com.dponyashov.back_java_spring.exceptions.SaveErrorException;
import com.dponyashov.back_java_spring.mappers.SessionMapper;
import com.dponyashov.back_java_spring.mappers.SessionRefreshMapper;
import com.dponyashov.back_java_spring.repository.SessionRefreshRepository;
import com.dponyashov.back_java_spring.repository.SessionRepository;
import com.dponyashov.back_java_spring.services.SessionService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
@Log4j2
public class SessionServiceImpl implements SessionService {

    private final SessionRepository sessionRepository;
//    private final SessionRefreshRepository sessionRefreshRepository;

    @Override
    public Collection<SessionDto> findAll() {
        return sessionRepository.findAll().stream()
                .filter(session -> !session.isDeleted())
                .map(SessionMapper::entityToDto)
                .toList();
    }

    @Override
    public SessionDto findById(UUID id) {
        var selectedSession = sessionRepository.findById(id);
        return selectedSession.map(SessionMapper::entityToDto)
                .orElseThrow(()-> new NotFountException("Сессия не найдена!"));
    }

    @Override
    public Collection<SessionDto> findByUserId(Long userId) {
        var selectedSession = sessionRepository.findByUserId(userId);
        return selectedSession.stream().map(SessionMapper::entityToDto).toList();
    }

    @Override
    public SessionDto save(SessionDto session) {
        var savedSession = sessionRepository.save(SessionMapper.dtoToEntity(session));

        log.info("SessionServiceImpl.save");
        return SessionMapper.entityToDto(savedSession);

//        return savedSession.(SessionMapper::entityToDto)
//                .orElseThrow(() -> new SaveErrorException("Сессию не удалось сохранить!"));
    }

    @Override
    public void delete(UUID id) {
        var session = findById(id);
//        sessionRepository.delete(SessionMapper.dtoToEntity(session));

        var deletedSession = SessionMapper.dtoToEntity(session);
        deletedSession.setDeleted(true);
        sessionRepository.save(deletedSession);

        log.info("SessionServiceImpl.delete");
//        sessionRepository.findAll().forEach(sessionEntity -> log.info("{}",sessionEntity.toString()));
    }

    @Override
    public void deleteWithRefresh(UUID refreshToken) {
        var accessSession = sessionRepository.findAllByRefresh(refreshToken);
        accessSession.stream()
                .filter(session -> !session.isDeleted() && session.getExpired().isAfter(LocalDateTime.now()))
                .map(session -> {
                    session.setDeleted(true);
                    return session;
                })
                .forEach(sessionRepository::save);


        log.info("SessionServiceImpl.deleteWithRefresh");
//        sessionRepository.findAll().forEach(sessionEntity -> log.info("{}",sessionEntity.toString()));
    }

    @Override
    public Collection<SessionDto> findByRefreshId(UUID uuid) {
        var selectedSession = sessionRepository.findAllByRefresh(uuid);
        return selectedSession.stream().map(SessionMapper::entityToDto).toList();
    }
}

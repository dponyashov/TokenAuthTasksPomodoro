package com.dponyashov.back_java_spring.repository.impl;

import com.dponyashov.back_java_spring.entity.SessionEntity;
import com.dponyashov.back_java_spring.repository.SessionRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

//@Repository
//public class SessionRepositoryImpl implements SessionRepository {
//
//    private final Map<UUID, SessionEntity> sessions = new HashMap<>();
//
//    @Override
//    public Collection<SessionEntity> findAll() {
//        return sessions.values();
//    }
//
//    @Override
//    public Collection<SessionEntity> findAllWithRefresh(UUID refreshToken) {
//        return sessions.values().stream()
//                .filter(session -> session.getRefresh().equals(refreshToken))
//                .toList();
//    }
//
//    @Override
//    public Optional<SessionEntity> findById(UUID id) {
//        var session = sessions.get(id);
//        if (session != null) {
//            return Optional.of(session);
//        }
//        return Optional.empty();
//    }
//
//    @Override
//    public Optional<SessionEntity> save(SessionEntity session) {
//        var selectedSession = sessions.get(session.getId());
//        if (selectedSession == null) {
//            session.setId(UUID.randomUUID());
//        }
//        sessions.put(session.getId(), session);
//        return Optional.of(session);
//    }
//
//    @Override
//    public void delete(UUID id) {
//        var session = sessions.get(id);
//        if (session != null) {
//            session.setDeleted(true);
//            sessions.put(id, session);
//        }
//    }
//}

package com.dponyashov.back_java_spring.repository.impl;

import com.dponyashov.back_java_spring.entity.SessionRefreshEntity;
import com.dponyashov.back_java_spring.repository.SessionRefreshRepository;
import org.springframework.stereotype.Repository;

import java.util.*;
//
//@Repository
//public class SessionRefreshRepositoryImpl implements SessionRefreshRepository {
//    private final Map<UUID, SessionRefreshEntity> sessions = new HashMap<>();
//
//    @Override
//    public Collection<SessionRefreshEntity> findAll() {
//        return sessions.values();
//    }
//
//    @Override
//    public Optional<SessionRefreshEntity> findById(UUID id) {
//        var session = sessions.get(id);
//        if (session != null) {
//            return Optional.of(session);
//        }
//        return Optional.empty();
//    }
//
//    @Override
//    public Optional<SessionRefreshEntity> save(SessionRefreshEntity session) {
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

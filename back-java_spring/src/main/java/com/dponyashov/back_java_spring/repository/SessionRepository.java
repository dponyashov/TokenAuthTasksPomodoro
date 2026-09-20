package com.dponyashov.back_java_spring.repository;

import com.dponyashov.back_java_spring.entity.SessionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SessionRepository extends JpaRepository<SessionEntity, UUID> {
    Collection<SessionEntity> findAllByRefresh(UUID refreshToken);
    Collection<SessionEntity> findByUserId(Long userId);

//    Collection<SessionEntity> findAll();
//    Collection<SessionEntity> findAllWithRefresh(UUID refreshToken);
//    Optional<SessionEntity> findById(UUID id);
//    Optional<SessionEntity> save(SessionEntity session);
//    void delete(UUID id);
}

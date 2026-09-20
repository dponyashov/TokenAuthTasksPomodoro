package com.dponyashov.back_java_spring.repository;

import com.dponyashov.back_java_spring.entity.SessionRefreshEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SessionRefreshRepository extends JpaRepository<SessionRefreshEntity, UUID> {
//    Collection<SessionRefreshEntity> findAll();
//    Optional<SessionRefreshEntity> findById(UUID id);
//    Optional<SessionRefreshEntity> save(SessionRefreshEntity session);
//    void delete(UUID id);
}

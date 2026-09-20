package com.dponyashov.back_java_spring.repository;

import com.dponyashov.back_java_spring.entity.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<TaskEntity, Long> {
    Collection<TaskEntity> findByUserId(Long userId);
//    Collection<TaskEntity> findAll();
//    Optional<TaskEntity> findById(Long id);
//    Optional<TaskEntity> save(TaskEntity task);
//    void delete(Long id);
}

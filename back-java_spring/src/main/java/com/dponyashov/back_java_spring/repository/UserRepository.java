package com.dponyashov.back_java_spring.repository;

import com.dponyashov.back_java_spring.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Collection<UserEntity> findByUserName(String userName);
//    Collection<UserEntity> findAll();
//    Optional<UserEntity> findById(Long id);
//    Optional<UserEntity> save(UserEntity user);
//    void delete(Long id);
}
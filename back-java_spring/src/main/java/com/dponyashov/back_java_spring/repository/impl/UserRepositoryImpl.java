package com.dponyashov.back_java_spring.repository.impl;

import com.dponyashov.back_java_spring.entity.UserEntity;
import com.dponyashov.back_java_spring.repository.UserRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

//@Repository
//public class UserRepositoryImpl implements UserRepository {
//
//    private Long currentId = 1L;
//    private final Map<Long, UserEntity> userList = new HashMap<>();
//    {
//        var userId = currentId++;
//        userList.put(userId, new UserEntity(userId, "user", "111", "firstName user", "last name user"));
//        userId = currentId++;
//        userList.put(userId, new UserEntity(userId, "user2", "111", "firstName user2", "last name user2"));
//    }
//
//    @Override
//    public Collection<UserEntity> findAll() {
//        return userList.values();
//    }
//
//    @Override
//    public Optional<UserEntity> findById(Long id) {
//        var user = userList.get(id);
//
//        if (user != null) {
//            return Optional.of(user);
//        }
//        return Optional.empty();
//    }
//
//    @Override
//    public Optional<UserEntity> save(UserEntity user) {
//        System.out.printf("UserRepositoryImpl.save: %s", user.toString());
//
//        if (user.getId() < 1L) {
//            user.setId(currentId++);
//        }
//
//        userList.put(user.getId(), user);
//        return Optional.of(user);
//    }
//
//    @Override
//    public void delete(Long id) {
//        userList.remove(id);
//    }
//}

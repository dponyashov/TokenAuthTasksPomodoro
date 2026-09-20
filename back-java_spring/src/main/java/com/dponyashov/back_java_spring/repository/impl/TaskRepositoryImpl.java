package com.dponyashov.back_java_spring.repository.impl;

import com.dponyashov.back_java_spring.entity.TaskEntity;
import com.dponyashov.back_java_spring.repository.TaskRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

//@Repository
//public class TaskRepositoryImpl implements TaskRepository {
//
//    private Long currentId = 1L;
//    private final Map<Long, TaskEntity> taskList = new HashMap<>();
//
//    @Override
//    public Collection<TaskEntity> findAll() {
//        return taskList.values();
//    }
//
//    @Override
//    public Optional<TaskEntity> findById(Long id) {
//        var task = taskList.get(id);
//
//        if (task != null) {
//            return Optional.of(task);
//        }
//        return Optional.empty();
//    }
//
//    @Override
//    public Optional<TaskEntity> save(TaskEntity task) {
//        System.out.printf("TaskRepositoryImpl.save: %s", task.toString());
//
//        if (task.getId() < 1L) {
//            task.setId(currentId++);
//        }
//
//        taskList.put(task.getId(), task);
//        return Optional.of(task);
//    }
//
//    @Override
//    public void delete(Long id) {
//        taskList.remove(id);
//    }
//}

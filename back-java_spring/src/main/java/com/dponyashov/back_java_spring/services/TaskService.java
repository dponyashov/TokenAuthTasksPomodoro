package com.dponyashov.back_java_spring.services;

import com.dponyashov.back_java_spring.dto.tasks.TaskDto;

import java.util.Collection;

public interface TaskService {
    Collection<TaskDto> findAll();
    TaskDto findById(Long id);
    TaskDto save(TaskDto task);
    void delete(Long id);

    Collection<TaskDto> findByUserId(Long id);
}

package com.dponyashov.back_java_spring.services.impl;

import com.dponyashov.back_java_spring.dto.tasks.TaskDto;
import com.dponyashov.back_java_spring.exceptions.NotFountException;
import com.dponyashov.back_java_spring.mappers.TaskMapper;
import com.dponyashov.back_java_spring.repository.TaskRepository;
import com.dponyashov.back_java_spring.services.TaskService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@AllArgsConstructor
@Log4j2
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Override
    public Collection<TaskDto> findAll() {
        log.info("TaskService.findAll");
        return taskRepository.findAll().stream()
                .map(TaskMapper::entityToDto)
                .toList();
    }

    @Override
    public Collection<TaskDto> findByUserId(Long id) {
        log.info("TaskService.findByUserId");
        return taskRepository.findByUserId(id).stream()
                .map(TaskMapper::entityToDto)
                .toList();
    }

    @Override
    public TaskDto findById(Long id) {
        log.info("TaskService.findById");
        var selectedTask = taskRepository.findById(id);
        return selectedTask.map(TaskMapper::entityToDto)
                .orElseThrow(() -> new NotFountException("Таска не найдена!"));
    }

    @Override
    public TaskDto save(TaskDto task) {
        log.info("TaskService.save");
        if (task.getId() != null) {
            findById(task.getId()); //Проверяем наличие таски перед перед сохранением, если не новая
        }
        var savedTask = taskRepository.save(TaskMapper.dtoToEntity(task));
        return TaskMapper.entityToDto(savedTask);
    }

    @Override
    public void delete(Long id) {
        log.info("TaskService.delete");
        var task = findById(id); //Проверяем наличие таски перед удалением
        taskRepository.delete(TaskMapper.dtoToEntity(task));
    }
}
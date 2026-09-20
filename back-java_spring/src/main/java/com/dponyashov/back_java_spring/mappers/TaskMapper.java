package com.dponyashov.back_java_spring.mappers;

import com.dponyashov.back_java_spring.dto.tasks.TaskDto;
import com.dponyashov.back_java_spring.entity.TaskEntity;

public class TaskMapper {
    public static TaskDto entityToDto(TaskEntity entity) {
        return TaskDto.builder()
                .id(entity.getId())
                .text(entity.getText())
                .userId(entity.getUserId())
                .completed(entity.isCompleted())
                .build();
    }

    public static TaskEntity dtoToEntity(TaskDto dto) {
        return TaskEntity.builder()
                .id(dto.getId())
                .text(dto.getText())
                .userId(dto.getUserId())
                .completed(dto.isCompleted())
                .build();
    }
}

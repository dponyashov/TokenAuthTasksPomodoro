package com.dponyashov.back_java_spring.dto.tasks;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class TaskDto {
    private Long id;
    private String text;
    private Long userId;
    private boolean completed;
}

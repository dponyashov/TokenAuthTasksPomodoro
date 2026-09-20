package com.dponyashov.back_java_spring.dto.tasks;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class TaskNewDto {
    private String text;
    private boolean completed;
}
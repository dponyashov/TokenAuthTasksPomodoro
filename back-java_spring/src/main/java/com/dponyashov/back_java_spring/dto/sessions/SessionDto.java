package com.dponyashov.back_java_spring.dto.sessions;

import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class SessionDto {
    private UUID id;
    private Long userId;
    private UUID refresh;
    private LocalDateTime created;
    private LocalDateTime expired;
    private boolean isDeleted;
}

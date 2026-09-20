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
public class SessionRefreshDto {
    private UUID id;
    private Long userId;
    private LocalDateTime created;
    private LocalDateTime expired;
    private boolean isDeleted;
}

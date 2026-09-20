package com.dponyashov.back_java_spring.entity;

import jakarta.annotation.Generated;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Table(name = "t_session")
public class SessionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "uuid")
    private UUID id;
    private Long userId;
    private UUID refresh;
    private LocalDateTime created;
    private LocalDateTime expired;
    private boolean isDeleted;
}

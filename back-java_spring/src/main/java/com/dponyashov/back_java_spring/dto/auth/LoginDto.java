package com.dponyashov.back_java_spring.dto.auth;

import lombok.*;

@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class LoginDto {
    private String userName;
    private String password;
}
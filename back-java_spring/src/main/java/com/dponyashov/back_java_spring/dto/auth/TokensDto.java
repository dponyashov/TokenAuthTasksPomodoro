package com.dponyashov.back_java_spring.dto.auth;

import jakarta.servlet.http.Cookie;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class TokensDto {
    private String accessToken;
    private String refreshToken;
    private Cookie refreshCookie;
    private Long userId;
}

package com.dponyashov.back_java_spring.services;

import com.dponyashov.back_java_spring.dto.auth.TokensDto;
import jakarta.servlet.http.Cookie;
import org.springframework.stereotype.Service;

@Service
public interface TokenService {
    TokensDto generateTokens(Long userId);
    TokensDto refreshToken(String refreshToken);
    Cookie createCookie(String refreshToken);
    Cookie clearCookie();
    void clearRefreshSession(String token);
    void clearSession(String token);
    boolean tokenValidate(String token);
    boolean tokenRefreshValidate(String token);
}

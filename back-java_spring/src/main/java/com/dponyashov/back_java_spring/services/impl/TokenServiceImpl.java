package com.dponyashov.back_java_spring.services.impl;

import com.dponyashov.back_java_spring.config.AuthConfig;
import com.dponyashov.back_java_spring.dto.auth.TokensDto;
import com.dponyashov.back_java_spring.dto.sessions.SessionDto;
import com.dponyashov.back_java_spring.dto.sessions.SessionRefreshDto;
import com.dponyashov.back_java_spring.exceptions.UnAuthorizedException;
import com.dponyashov.back_java_spring.services.SessionRefreshService;
import com.dponyashov.back_java_spring.services.SessionService;
import com.dponyashov.back_java_spring.services.TokenService;
import jakarta.servlet.http.Cookie;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;


@Service
@AllArgsConstructor
@Log4j2
public class TokenServiceImpl implements TokenService {

    private final SessionService sessionService;
    private final SessionRefreshService sessionRefreshService;

    @Override
    public TokensDto generateTokens(Long userId) {
        var refreshToken = generateRefreshToken(userId);

        return TokensDto.builder()
                .refreshCookie(createCookie(refreshToken.toString()))
                .accessToken(generateAccessToken(userId, refreshToken).toString())
                .refreshToken(refreshToken.toString())
                .userId(userId)
                .build();
    }

    @Override
    public TokensDto refreshToken(String refreshToken) {

        if (!tokenRefreshValidate(refreshToken)){
            throw new UnAuthorizedException("Рефреш токен не валиден!");
        }

        var token = UUID.fromString(refreshToken);
        var userId = sessionRefreshService.getUserIdByToken(token);

        return TokensDto.builder()
                .accessToken(generateAccessToken(userId, token).toString())
                .refreshToken(refreshToken)
                .userId(userId)
                .build();
    }

    @Override
    public Cookie createCookie(String refreshToken) {
        Cookie cookie = new Cookie(AuthConfig.REFRESH_TOKEN_NAME, refreshToken);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(AuthConfig.REFRESH_TIMEOUT);
        return cookie;
    }

    @Override
    public Cookie clearCookie() {
        Cookie cookie = new Cookie(AuthConfig.REFRESH_TOKEN_NAME, null);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0);
        return cookie;
    }

    @Override
    public void clearRefreshSession(String token) {
        sessionService.deleteWithRefresh(UUID.fromString(token));
        sessionRefreshService.delete(UUID.fromString(token));
    }

    @Override
    public void clearSession(String token) {
        sessionService.delete(UUID.fromString(token));
    }

    @Override
    public boolean tokenValidate(String token) {

        var session = sessionService.findById(UUID.fromString(token));
        if (session.isDeleted() ){
            return false;
        }
        return !session.getExpired().isBefore(LocalDateTime.now());
    }

    @Override
    public boolean tokenRefreshValidate(String token) {

        try {
            var session = sessionRefreshService.findById(UUID.fromString(token));
            if (session.isDeleted() ){
                return false;
            }
            return !session.getExpired().isBefore(LocalDateTime.now());
        } catch (RuntimeException e) {
            log.info(String.format("Не найдена refresh-сессия %s", e.getMessage()));
            return false;
        }
    }

    private UUID generateRefreshToken(Long userId) {
        var newSession = sessionRefreshService.save(SessionRefreshDto.builder()
                        //.id(UUID.randomUUID())
                        .userId(userId)
                        .created(LocalDateTime.now())
                        .expired(LocalDateTime.now().plusSeconds(AuthConfig.REFRESH_TIMEOUT))
                        .isDeleted(false)
                .build());

        return newSession.getId();
    }

    private UUID generateAccessToken(Long userId, UUID refreshToken) {
        var newSession = sessionService.save(SessionDto.builder()
                //.id(UUID.randomUUID())
                .userId(userId)
                .refresh(refreshToken)
                .created(LocalDateTime.now())
                .expired(LocalDateTime.now().plusSeconds(AuthConfig.SESSION_TIMEOUT))
                .isDeleted(false)
                .build());



        return newSession.getId();
    }
}

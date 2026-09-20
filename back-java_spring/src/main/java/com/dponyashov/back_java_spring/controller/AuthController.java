package com.dponyashov.back_java_spring.controller;


import com.dponyashov.back_java_spring.config.AuthConfig;
import com.dponyashov.back_java_spring.dto.auth.AccessDto;
import com.dponyashov.back_java_spring.dto.auth.LoginDto;
import com.dponyashov.back_java_spring.dto.sessions.SessionDto;
import com.dponyashov.back_java_spring.dto.user.NewUserDto;
import com.dponyashov.back_java_spring.exceptions.UnAuthorizedException;
import com.dponyashov.back_java_spring.services.SessionService;
import com.dponyashov.back_java_spring.services.TokenService;
import com.dponyashov.back_java_spring.services.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Collection;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
@Log4j2
public class AuthController {

    private final UserService userService;
    private final TokenService tokenService;
    private final SessionService sessionService;

    @PostMapping("/login")
    public ResponseEntity<AccessDto> login(@RequestBody LoginDto login, HttpServletResponse response){

        log.info(login.toString());

        var user = userService.findByUsername(login.getUserName(), login.getPassword());

        if (user == null) {
            throw new UnAuthorizedException("Неверный логин или пароль!");
        }

        var savedSessions = sessionService.findByUserId(user.getId());
        var validSession = savedSessions.stream()
                .filter(session -> tokenService.tokenValidate(session.getId().toString()))
                .findFirst()
                .orElse(null);

        if (validSession != null ) {
            response.addCookie(tokenService.createCookie(validSession.getRefresh().toString()));
            return ResponseEntity.status(HttpStatus.OK).body(
                    AccessDto.builder()
                            .accessToken(validSession.getId().toString())
                            .user(user)
                            .build());
        } else {
            var tokens = tokenService.generateTokens(user.getId());
            response.addCookie(tokens.getRefreshCookie());
            return ResponseEntity.status(HttpStatus.OK).body(
                    AccessDto.builder()
                            .accessToken(tokens.getAccessToken())
                            .user(user)
                            .build());
        }
    }

    @PostMapping("/registry")
    public ResponseEntity<?> registry(@RequestBody NewUserDto newUser){
        log.info("AuthController.registry");
        log.info("AuthController.registry {}", newUser.toString());

        var user = userService.findByUsername(newUser.getUserName());

        if (user != null) {
            throw new RuntimeException("Пользователь с таким именем уже существует");
        }

        var savedUser = userService.save(NewUserDto.builder()
                        .id(newUser.getId())
                        .userName(newUser.getUserName())
                        .lastName(newUser.getLastName())
                        .password(newUser.getPassword())
                        .firstName(newUser.getFirstName())
                .build());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/refresh")
    public ResponseEntity<AccessDto> refresh(HttpServletRequest request, HttpServletResponse response){
        log.info("AuthController.refresh");

        try {
            var cookies = request.getCookies();
            if (cookies == null || cookies.length < 1) {
                throw new UnAuthorizedException("Нет рефреш куки!");
            }

            Cookie refreshCookie = Arrays.stream(cookies)
                    .filter(cookie -> AuthConfig.REFRESH_TOKEN_NAME.equals(cookie.getName()))
                    .findFirst()
                    .orElse(null);
            if (refreshCookie == null) {
                throw new UnAuthorizedException("Нет рефреш токена, необходимо перелогиниться!");
            }

            log.info(String.format("Кука: %s, значение: %s", refreshCookie.getName(), refreshCookie.getValue()));

//        Проверяем наличие действующей сессии
            Collection<SessionDto> savedSessions = sessionService.findByRefreshId(UUID.fromString(refreshCookie.getValue()));
            SessionDto validSession = savedSessions.stream()
                    .filter(session -> tokenService.tokenValidate(session.getId().toString()))
                    .findFirst()
                    .orElse(null);

            if (validSession != null) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        AccessDto.builder()
                                .accessToken(validSession.getId().toString())
                                .user(userService.findById(validSession.getUserId()))
                                .build());
            }

//        Если валидной сессии нет, генерируем новую

            var tokens = tokenService.refreshToken(refreshCookie.getValue());
            log.info("AuthController.refresh - готово");
            return ResponseEntity.status(HttpStatus.OK).body(
                    AccessDto.builder()
                            .accessToken(tokens.getAccessToken())
                            .user(userService.findById(tokens.getUserId()))
                            .build());
        } catch (RuntimeException e) {
//            response.addCookie(tokenService.clearCookie());
            throw new UnAuthorizedException(e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response){

        // Чистим сессию рефреш

        var cookies = request.getCookies();

        if (cookies != null) {
            Arrays.stream(cookies)
                    .filter(cookie -> AuthConfig.REFRESH_TOKEN_NAME.equals(cookie.getName()))
                    .findFirst()
                    .ifPresent(refreshCookie -> tokenService.clearRefreshSession(refreshCookie.getValue()));


            response.addCookie(tokenService.clearCookie());

            // Чистим сессию аксес, если вдруг пришел заголовок с токеном
            var accessHeader = request.getHeader(AuthConfig.AUTH_HEADER_NAME);
            if (accessHeader != null) {
                var token = accessHeader.split(" ");
                if (token.length > 1 && token[0].equalsIgnoreCase("bearer")) {
                    tokenService.clearSession(token[1]);
                }
            }
        }

        return ResponseEntity.status(HttpStatus.OK).build();
    }
}

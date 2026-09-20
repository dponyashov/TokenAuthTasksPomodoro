package com.dponyashov.back_java_spring.intercetors;

import com.dponyashov.back_java_spring.config.AuthConfig;
import com.dponyashov.back_java_spring.dto.user.UserDto;
import com.dponyashov.back_java_spring.exceptions.UnAuthorizedException;
import com.dponyashov.back_java_spring.services.SessionService;
import com.dponyashov.back_java_spring.services.TokenService;
import com.dponyashov.back_java_spring.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.UUID;

@Component
@Log4j2
@AllArgsConstructor
public class AuthInterceptor implements HandlerInterceptor {

    private final UserService userService;
    private final SessionService sessionService;
    private final TokenService tokenService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler){

//        HandlerMethod hMethod = (HandlerMethod)handler;
//        log.info("Интерцептор сработал. Объект: {} метод: {}", hMethod.getBeanType().getName(),  hMethod.getMethod().getName());
        try {
            var authHeader = request.getHeader(AuthConfig.AUTH_HEADER_NAME);

            if (authHeader == null || authHeader.trim().isEmpty()){
                throw new UnAuthorizedException("Нет заголовка авторизации");
            }

            var sessionData = authHeader.split(" ");
            if (sessionData.length < 2 || !sessionData[0].trim().equalsIgnoreCase("bearer")){
                throw new UnAuthorizedException("Неверный заголовок авторизации");
            }

            var session = sessionService.findById(UUID.fromString(sessionData[1]));

            if (session == null) {
                throw new UnAuthorizedException(String.format("Сессия %s не найдена", sessionData[1]));
            }

            UserDto currentUser = userService.findById(session.getUserId());

            if (currentUser == null) {
                throw new UnAuthorizedException(String.format("Пользователя %s не сеществует", session.getUserId()));
            }

            log.info("Текущий Id пользователя {} ", currentUser.getId());

            if (!tokenService.tokenValidate(session.getId().toString())){
                throw new UnAuthorizedException(String.format("Токен %s не валидный!", session.getId()));
            }

            request.setAttribute("currentUser", currentUser);

            return true; // true — идти дальше к контроллеру, false — остановить цепочку
        } catch (RuntimeException e) {
//            throw new UnAuthorizedException(e.getMessage());
            log.info(e.getMessage());
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            return false;
        }
    }
}

package com.dponyashov.back_java_spring.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class CorsConfig {

    @Value("${app.variables.front_url}")
    private String front_url;

    @Bean
    public CorsFilter corsFilter() {

        System.out.printf("front_url: %s%n", front_url);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // Разрешить отправку куки и авторизационных данных
        config.setAllowCredentials(true);

        // Укажите разрешенные домены (или List.of("*") для всех)
        config.setAllowedOriginPatterns(List.of(front_url));//"http://localhost:5173"));

        // Разрешенные заголовки
        config.setAllowedHeaders(List.of("*"));

        // Разрешенные HTTP-методы
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));

        // Применить конфигурацию для всех путей в приложении
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}

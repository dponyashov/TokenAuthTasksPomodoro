package com.dponyashov.back_java_spring.config;

import lombok.Getter;

@Getter
public class AuthConfig {
    public static String REFRESH_TOKEN_NAME = "refresh_token";
    public static int SESSION_TIMEOUT       = 15 * 60; // 15 минут
    public static int REFRESH_TIMEOUT       = 7 * 24 * 60 * 60; // 7 суток
    public static String AUTH_HEADER_NAME   = "Authorization";
}

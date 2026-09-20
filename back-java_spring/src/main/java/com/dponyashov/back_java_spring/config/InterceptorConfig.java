package com.dponyashov.back_java_spring.config;

import com.dponyashov.back_java_spring.intercetors.AuthInterceptor;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@AllArgsConstructor
public class InterceptorConfig implements WebMvcConfigurer {

    private final AuthInterceptor authInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authInterceptor)
                .addPathPatterns("/api/**")
                .excludePathPatterns(
                        "/api/auth/login/**",
                        "/api/auth/registry/**",
                        "/api/auth/refresh/**",
                        "/api/auth/logout/**"
                );
    }

//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOrigins("http://localhost:5173")
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                .allowedHeaders("Accept",
//                        "Accept-Language",
//                        "Content-Language",
//                        "Content-Type",
//                        "Access-Control-Allow-Credentials",
//                        "Access-Control-Allow-Headers",
//                        "Access-Control-Allow-Origin",
//                        "Authorization")
//                .exposedHeaders("Authorization")
//                .allowCredentials(true);
//    }
}

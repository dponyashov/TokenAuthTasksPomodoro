package com.dponyashov.back_java_spring.filters;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Log4j2
public class AuthFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        log.info("Фильтр сработал! URI: {} - {}",((HttpServletRequest)servletRequest).getMethod(),  ((HttpServletRequest)servletRequest).getRequestURI());

        filterChain.doFilter(servletRequest, servletResponse);
    }
}

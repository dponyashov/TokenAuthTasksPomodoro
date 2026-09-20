package com.dponyashov.back_java_spring.controller;

import com.dponyashov.back_java_spring.exceptions.NotFountException;
import com.dponyashov.back_java_spring.exceptions.SaveErrorException;
import com.dponyashov.back_java_spring.exceptions.UnAuthorizedException;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Log4j2
public class ExceptionController {

    @ExceptionHandler(UnAuthorizedException.class)
    public ResponseEntity<?> exceptionHandler(UnAuthorizedException exception){
        log.error("{} : {}", HttpStatus.UNAUTHORIZED, exception.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(exception.getMessage());
    }

    @ExceptionHandler(SaveErrorException.class)
    public ResponseEntity<?> exceptionHandler(SaveErrorException exception){
        log.error("{} : {}", HttpStatus.BAD_REQUEST, exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
    }

    @ExceptionHandler(NotFountException.class)
    public ResponseEntity<?> exceptionHandler(NotFountException exception){
        log.error("{} : {}", HttpStatus.NOT_FOUND, exception.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> exceptionHandler(RuntimeException exception){
        log.error("{} : {}", HttpStatus.BAD_REQUEST, exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
    }
}
package com.dponyashov.back_java_spring.exceptions;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class NotFountException extends RuntimeException {
    public NotFountException(String message){
        super(message);
    }
}

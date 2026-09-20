package com.dponyashov.back_java_spring.exceptions;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class SaveErrorException extends RuntimeException {
    public SaveErrorException(String message) {
        super(message);
    }
}

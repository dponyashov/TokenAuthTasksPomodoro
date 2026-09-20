package com.dponyashov.back_java_spring.services;

import com.dponyashov.back_java_spring.dto.user.NewUserDto;
import com.dponyashov.back_java_spring.dto.user.UserDto;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public interface UserService {
    Collection<UserDto> findAll();
    UserDto findById(Long id);
    UserDto findByUsername(String userName, String password);
    UserDto findByUsername(String userName);
    UserDto save(UserDto user);
    UserDto save(NewUserDto user);
    void delete(Long id);
}

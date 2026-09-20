package com.dponyashov.back_java_spring.services.impl;

import com.dponyashov.back_java_spring.dto.user.NewUserDto;
import com.dponyashov.back_java_spring.dto.user.UserDto;
import com.dponyashov.back_java_spring.entity.UserEntity;
import com.dponyashov.back_java_spring.exceptions.NotFountException;
import com.dponyashov.back_java_spring.exceptions.SaveErrorException;
import com.dponyashov.back_java_spring.mappers.UserMapper;
import com.dponyashov.back_java_spring.repository.UserRepository;
import com.dponyashov.back_java_spring.services.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@AllArgsConstructor
@Log4j2
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public Collection<UserDto> findAll() {
        return userRepository.findAll().stream()
                .map(UserMapper::entityToDto)
                .toList();
    }

    @Override
    public UserDto findById(Long id) {
        var selectedUser = userRepository.findById(id);
        return selectedUser.map(UserMapper::entityToDto)
                .orElseThrow(() -> new NotFountException("Юзер не найден!"));
    }

    @Override
    public UserDto findByUsername(String userName, String password) {
        return userRepository.findAll().stream()
                .filter(userEntity -> userEntity.getUserName().trim().equalsIgnoreCase(userName.trim()) &&
                                                userEntity.getUserPassword().trim().equals(password.trim())
                )
                .findFirst()
                .map(UserMapper::entityToDto)
                .orElse(null);
    }

    @Override
    public UserDto findByUsername(String userName) {
        return userRepository.findByUserName(userName).stream()
                .findFirst()
                .map(UserMapper::entityToDto)
                .orElse(null);
    }

    @Override
    public UserDto save(UserDto user) {
        if (user.getId() > 0) {
            findById(user.getId()); //Проверяем наличие таски перед перед сохранением, если не новая
        }
        var savedUser = userRepository.save(UserMapper.dtoToEntity(user));

        return UserMapper.entityToDto(savedUser);

//        return savedUser.map(UserMapper::entityToDto)
//                .orElseThrow(() -> new SaveErrorException("Юзера не удалось сохранить!"));
    }

    @Override
    public UserDto save(NewUserDto user) {
        var savedUser = userRepository.save(UserEntity.builder()
                        .userName(user.getUserName())
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .userPassword(user.getPassword())
                .build());

        return UserDto.builder()
                .id(savedUser.getId())
                .userName(savedUser.getUserName())
                .firstName(savedUser.getFirstName())
                .lastName(savedUser.getLastName())
                .build();
    }

    @Override
    public void delete(Long id) {
        var user = findById(id); //Проверяем наличие таски перед удалением
        userRepository.delete(UserMapper.dtoToEntity(user));
    }
}

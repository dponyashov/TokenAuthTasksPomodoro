package com.dponyashov.back_java_spring.dto.auth;

import com.dponyashov.back_java_spring.dto.user.UserDto;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class AccessDto {
    private String accessToken;
    private UserDto user;
}

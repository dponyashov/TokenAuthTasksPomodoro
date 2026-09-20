package com.dponyashov.back_java_spring.dto.user;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class UserDto {
    private Long id;
    private String userName;
    private String firstName;
    private String lastName;
}

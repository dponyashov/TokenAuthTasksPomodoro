import { IsEmail, IsString, MinLength } from 'class-validator';
import { LoginUserDto } from './login-user.dto.js';

export class CreateUserDto extends LoginUserDto {

  @IsString()
  @MinLength(1, { message: 'Имя не должно быть пустым' })
  readonly firstName: string;

  @IsString()
  @MinLength(1, { message: 'Фамилия не должна быть пустой' })
  readonly lastName: string;
}
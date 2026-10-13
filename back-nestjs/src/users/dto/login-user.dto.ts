import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginUserDto {
    @IsEmail({}, { message: 'Некорректный формат email' })
    readonly email: string;
    
    @IsString()
    @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
    readonly password: string;
}
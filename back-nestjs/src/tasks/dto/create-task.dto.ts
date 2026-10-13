import { IsString, MinLength } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @MinLength(10, { message: 'Текст задачи должен быть не меньше 10 символов' })
    readonly text: string;
}
import { ResponseUserDto } from "../../users/dto/response-user.dto.js";
import { UpdateTaskDto } from "./update-task.dto.js";

export class ResponseTaskDto extends UpdateTaskDto {
    id?: number;
    author?: ResponseUserDto;
}
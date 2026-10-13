import { IsBoolean } from "class-validator";
import { CreateTaskDto } from "./create-task.dto.js";

export class UpdateTaskDto extends CreateTaskDto{

    @IsBoolean()
    readonly completed: boolean;
}
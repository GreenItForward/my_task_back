import { IsNotEmpty, IsNumber } from "class-validator";

export class AddLabelToTaskDto {
    @IsNotEmpty()
    @IsNumber()
    taskId: number;

    @IsNotEmpty()
    @IsNumber()
    labelId: number;
}
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateLabelToTaskDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty( { required: true } )
    taskId: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty( { required: true } )
    labelId: number;
}
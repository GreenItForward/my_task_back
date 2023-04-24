import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class AddLabelToTaskDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty( { required: true } )
    taskId: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty( { required: true } )
    labelId: number;
}
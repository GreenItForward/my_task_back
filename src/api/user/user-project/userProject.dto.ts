import {IsNotEmpty, IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UserProjectDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ required: true })
    projectId: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ required: true })
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ required: true })
    roleId: number;
}
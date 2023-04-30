import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class JoinDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ required: true })
    projectId: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true })
    codeJoin: string;
}
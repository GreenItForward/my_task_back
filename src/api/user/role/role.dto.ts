import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    public readonly libelle: string;
}
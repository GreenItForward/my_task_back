import {IsEnum, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {RoleEnum} from "@/common/enums/role.enum";

export class JoinDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true })
    codeJoin: string;
}

export class ChangeRoleDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ required: true })
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ required: true })
    projectId: number;

    @IsNotEmpty()
    @IsEnum(RoleEnum)
    @ApiProperty({ required: true })
    role: RoleEnum;
}
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class PostSettings {
    @ApiProperty()
    @IsString()
    public readonly backgroundColor?: string;

    @ApiProperty()
    @IsString()
    public readonly backgroundImage?: string;
}
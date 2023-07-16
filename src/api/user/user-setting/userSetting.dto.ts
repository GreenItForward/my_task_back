import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class PostSettings {
    @ApiProperty()
    @IsString()
    public readonly background!: string;
}
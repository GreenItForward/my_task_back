import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLabelDto {
  @IsString()
  @IsNotEmpty({ always: true })
  @Transform(({ value }) => value.trim())
  @ApiProperty()
  readonly nom: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly couleur: string;

  @IsNotEmpty()
  @ApiProperty()
  projectId: number; 
} 
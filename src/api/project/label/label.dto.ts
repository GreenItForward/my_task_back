import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLabelDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly nom: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly couleur: string;

  @IsNotEmpty()
  @ApiProperty()
  taskId: number;

  @IsNotEmpty()
  @ApiProperty()
  projectId: number; 
}
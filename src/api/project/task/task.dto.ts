import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @ApiProperty()
  public readonly title: string;

  @IsString()
  @ApiProperty()
  public readonly description: string;

  @IsString()
  @ApiProperty()
  public readonly status: string;

  @IsNumber()
  @ApiProperty()
  public readonly user: number;

  @IsNumber()
  @ApiProperty()
  public readonly project: number;
}
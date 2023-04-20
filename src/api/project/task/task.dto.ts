import { StatusEnum } from '@/common/enums/status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @ApiProperty( { required: true } )
  public readonly title: string;

  @IsString()
  @ApiProperty( { required: false } )
  public readonly description: string;

  @IsEnum(StatusEnum)
  @ApiProperty( { enum: StatusEnum } )
  public readonly status: string;

  @IsNumber()
  @ApiProperty( { required: true } )
  public readonly projectID: number;
}

export class UpdateTaskDto {
  @IsNumber()
  @ApiProperty( { required: true } )
  public readonly id: number;
  
  @IsString()
  @ApiProperty( { required: false } )
  public readonly title: string;

  @IsString()
  @ApiProperty( { required: false } )
  public readonly description: string;

  @IsEnum(StatusEnum)
  @ApiProperty( { enum: StatusEnum } )
  public readonly status: string;

  @IsDate()
  @Type(() => Date)
  @ApiProperty( { required: false } )
  public readonly deadline: Date;

  @IsNumber()
  @ApiProperty( { required: true } )
  public readonly projectID: number;
}
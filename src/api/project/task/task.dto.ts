import { StatusEnum } from '@/common/enums/status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNumber()
  @ApiProperty( { required: false } )
  public readonly id: number;
  
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
import { StatusEnum } from '@/common/enums/status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';

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

  @ValidateIf((_, value) => value !== null && value !== 'null' && !isNaN(Date.parse(value)))
  @IsDate()
  @Transform(({ value }) => {
      if (value === null || value === 'null' || isNaN(Date.parse(value))) {        
          return null;
      } else if (value.obj && value.obj.deadline) {
          return new Date(value.obj.deadline);
      }
      return value;
  })
  @Type(() => Date)
  @IsOptional()
  @ApiProperty({ required: false })
  public readonly deadline: Date | null;

  @IsNumber()
  @ApiProperty( { required: true } )
  public readonly projectID: number;
}
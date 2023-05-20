import NoSpacesInProjectName from '@/common/validations/NoSpacesInProjectName';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @Validate(NoSpacesInProjectName)
  @ApiProperty()
  public readonly nom: string;

  @IsString()
  @ApiProperty()
  public readonly description: string;

}
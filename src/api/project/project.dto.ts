import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  readonly nom: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly codeJoin: string;

  readonly userId: number;

}
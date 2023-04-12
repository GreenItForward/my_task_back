import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLabelDto {
  @IsString()
  @IsNotEmpty()
  readonly nom: string;

  @IsString()
  @IsNotEmpty()
  readonly couleur: string;

  @IsNotEmpty()
  taskId: string;

}
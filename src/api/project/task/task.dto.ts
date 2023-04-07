import { IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly date: string;

  @IsString()
  readonly status: string;

  @IsString()
  readonly user: string;


}
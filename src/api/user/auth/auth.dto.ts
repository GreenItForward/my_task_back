import { ApiProperty } from '@nestjs/swagger';
import { Trim } from 'class-sanitizer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @Trim()
  @IsEmail()
  @ApiProperty()
  public readonly email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty()
  public readonly password: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly firstname?: string;
}

export class LoginDto {
  @Trim()
  @IsEmail()
  @ApiProperty()
  public readonly email: string;

  @IsString()
  @ApiProperty()
  public readonly password: string;
}

export class TokenDto {
  @IsString()
  @ApiProperty()
  public readonly token: string;
}
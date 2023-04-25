import {
  Body,
  Controller,
  Inject,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Req
} from '@nestjs/common';
import { User } from '@/api/user/user.entity';
import {RegisterDto, LoginDto, TokenDto} from './auth.dto';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { ApiBody, ApiOkResponse, ApiBadRequestResponse, ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: RegisterDto })
  @ApiOkResponse({
    description: 'User successfully registered',
    type: User,
  }) 
  @ApiBadRequestResponse({ description: 'Bad Request' })
  private register(@Body() body: RegisterDto): Promise<string | never> {
    return this.service.register(body);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  private login(@Body() body: LoginDto): Promise<string | never> {
    return this.service.login(body);
  }

  @Post('refresh')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 201, description: 'The access token has been refreshed.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private refresh(@Req() { user }: Request): Promise<string | never> {
    return this.service.refresh(<User>user);
  }

  @Post('getUser')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Decode token' })
  @ApiOkResponse({ status: 201, description: 'User has been send.', type: User })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: TokenDto })
  private getUser(@Body() body: TokenDto): Promise<User | never> {
    return this.service.getUser(body.token);
  }
}

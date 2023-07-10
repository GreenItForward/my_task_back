import {ApiBearerAuth, ApiBody, ApiTags} from "@nestjs/swagger";
import {
    Body,
    ClassSerializerInterceptor,
    Controller, Delete, Get, HttpException,
    Inject, Param,
    Post, Put,
    Req,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {Request} from "express";
import {UserSettingService} from "@/api/user/user-setting/userSetting.service";
import { JwtAuthGuard } from "../auth/auth.guard";
import { UserSetting } from "./userSetting.entity";
import { User } from "../user.entity";
import { PostSettings } from "./userSetting.dto";

@ApiTags('Users settings')
@Controller('user-setting')
export class UserSettingController {
    @Inject(UserSettingService)
    private readonly service: UserSettingService

    @Get('get-settings')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    private async getSettings(@Req() { user }: Request): Promise<UserSetting> {
        return this.service.getSettings(<User>user);
    }

    @Post('post-settings')
    @ApiBearerAuth()
    @ApiBody({ type: PostSettings })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    private async postSettings(@Body() body: PostSettings, @Req() { user }: Request): Promise<UserSetting> {
        return this.service.postSettings(<User>user, body);
    }

} 
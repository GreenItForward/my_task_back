import {ApiBearerAuth, ApiBody, ApiTags} from "@nestjs/swagger";
import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Inject,
    Post, Put,
    Req,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {UserProjectService} from "@/api/user/user-project/userProject.service";
import {JwtAuthGuard} from "@/api/user/auth/auth.guard";
import {ChangeRoleDto, JoinDto} from "@/api/user/user-project/userProject.dto";
import {UserProject} from "@/api/user/user-project/userProject.entity";
import {User} from "@/api/user/user.entity";
import {Request} from "express";

@ApiTags('Users and Projects')
@Controller('user-project')
export class UserProjectController {
    @Inject(UserProjectService)
    private readonly service: UserProjectService

    @Post('join')
    @ApiBearerAuth()
    @ApiBody({ type: JoinDto })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    private async join(@Body() body:JoinDto, @Req() { user }: Request): Promise<UserProject | never> {
        return this.service.join(body, <User>user);
    }

    @Put('change-role')
    @ApiBearerAuth()
    @ApiBody({ type: ChangeRoleDto })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    private async changeRole(@Body() body:ChangeRoleDto, @Req() { user }: Request): Promise<UserProject | never> {
        return this.service.changeRole(body, <User>user);
    }
}
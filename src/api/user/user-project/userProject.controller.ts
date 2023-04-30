import {ApiBearerAuth, ApiBody, ApiTags} from "@nestjs/swagger";
import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Inject,
    Post,
    Req,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {UserProjectService} from "@/api/user/user-project/userProject.service";
import {JwtAuthGuard} from "@/api/user/auth/auth.guard";
import {JoinDto} from "@/api/user/user-project/userProject.dto";
import {UserProject} from "@/api/user/user-project/userProject.entity";
import {User} from "@/api/user/user.entity";
import {Request} from "express";

@ApiTags('Users and Projects')
@Controller('join-project')
export class UserProjectController {
    @Inject(UserProjectService)
    private readonly service: UserProjectService

    @Post()
    @ApiBearerAuth()
    @ApiBody({ type: JoinDto })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    private async create(@Body() body:JoinDto, @Req() { user }: Request): Promise<UserProject | never> {
        return this.service.create(body, <User>user);
    }
}
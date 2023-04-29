import {ApiBearerAuth, ApiBody, ApiTags} from "@nestjs/swagger";
import {Body, ClassSerializerInterceptor, Controller, Inject, Post, UseGuards, UseInterceptors} from "@nestjs/common";
import {UserProjectService} from "@/api/user/user-project/userProject.service";
import {JwtAuthGuard} from "@/api/user/auth/auth.guard";
import {UserProjectDto} from "@/api/user/user-project/userProject.dto";
import {UserProject} from "@/api/user/user-project/userProject.entity";

@ApiTags('Users and Projects')
@Controller('user-project')
export class UserProjectController {
    @Inject(UserProjectService)
    private readonly service: UserProjectService

    @Post()
    @ApiBearerAuth()
    @ApiBody({ type: UserProjectDto })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    private async create(@Body() body:UserProjectDto): Promise<UserProject> {
        return this.service.create(body);
    }
}
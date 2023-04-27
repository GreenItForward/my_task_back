import {ApiBearerAuth, ApiBody, ApiTags} from "@nestjs/swagger";
import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Inject,
    Post,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {RoleService} from "@/api/user/role/role.service";
import {JwtAuthGuard} from "@/api/user/auth/auth.guard";
import {CreateRoleDto} from "@/api/user/role/role.dto";
import {Role} from "@/api/user/role/role.entity";

@ApiTags('Role')
@Controller('role')
export class RoleController {
    @Inject(RoleService)
    private readonly service: RoleService

    @Post()
    @ApiBearerAuth()
    @ApiBody({ type: CreateRoleDto })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    private async create(@Body() body:CreateRoleDto): Promise<Role> {
        return this.service.create(body);
    }
}
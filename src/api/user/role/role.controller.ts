import {ApiTags} from "@nestjs/swagger";
import {Controller, Inject} from "@nestjs/common";
import {RoleService} from "@/api/user/role/role.service";

@ApiTags('Role')
@Controller('role')
export class RoleController {
    @Inject(RoleService)
    private readonly service: RoleService

}
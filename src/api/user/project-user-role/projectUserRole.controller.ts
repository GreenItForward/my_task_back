import {ApiTags} from "@nestjs/swagger";
import {Controller, Inject} from "@nestjs/common";
import {ProjectUserRoleService} from "@/api/user/project-user-role/projectUserRole.service";

@ApiTags('Project User Role')
@Controller('project-user-role')
export class ProjectUserRoleController {
    @Inject(ProjectUserRoleService)
    private readonly service: ProjectUserRoleService

}
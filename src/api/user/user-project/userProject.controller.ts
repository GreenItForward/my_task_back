import {ApiTags} from "@nestjs/swagger";
import {Controller, Inject} from "@nestjs/common";
import {UserProjectService} from "@/api/user/user-project/userProject.service";

@ApiTags('Project User Role')
@Controller('user-project')
export class UserProjectController {
    @Inject(UserProjectService)
    private readonly service: UserProjectService

}
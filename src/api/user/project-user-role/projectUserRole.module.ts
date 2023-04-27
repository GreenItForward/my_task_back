import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {ProjectUserRole} from "@/api/user/project-user-role/projectUserRole.entity";
import {AuthModule} from "@/api/user/auth/auth.module";
import {ProjectUserRoleController} from "@/api/user/project-user-role/projectUserRole.controller";
import {ProjectUserRoleService} from "@/api/user/project-user-role/projectUserRole.service";

@Module({
    imports: [TypeOrmModule.forFeature([ProjectUserRole]), AuthModule],
    controllers: [ProjectUserRoleController],
    providers: [ProjectUserRoleService],
    exports: [ProjectUserRoleService],
})
export class RoleModule {}
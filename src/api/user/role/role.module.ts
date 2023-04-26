import {TypeOrmModule} from "@nestjs/typeorm";
import {Role} from "@/api/user/role/role.entity";
import {Module} from "@nestjs/common";
import {AuthModule} from "@/api/user/auth/auth.module";
import {RoleService} from "@/api/user/role/role.service";
import {RoleController} from "@/api/user/role/role.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Role]), AuthModule],
    controllers: [RoleController],
    providers: [RoleService],
    exports: [RoleService],
})
export class RoleModule {}
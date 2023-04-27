import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {UserProject} from "@/api/user/user-project/userProject.entity";
import {AuthModule} from "@/api/user/auth/auth.module";
import {UserProjectController} from "@/api/user/user-project/userProject.controller";
import {UserProjectService} from "@/api/user/user-project/userProject.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserProject]), AuthModule],
    controllers: [UserProjectController],
    providers: [UserProjectService],
    exports: [UserProjectService],
})
export class UserProjectModule {}
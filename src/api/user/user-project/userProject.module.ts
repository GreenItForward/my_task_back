import {TypeOrmModule} from "@nestjs/typeorm";
import {Module, forwardRef} from "@nestjs/common";
import {UserProject} from "@/api/user/user-project/userProject.entity";
import {AuthModule} from "@/api/user/auth/auth.module";
import {UserProjectController} from "@/api/user/user-project/userProject.controller";
import {UserProjectService} from "@/api/user/user-project/userProject.service";
import {Project} from "@/api/project/project.entity";
import {User} from "@/api/user/user.entity";
import {ProjectModule} from "@/api/project/project.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserProject, Project, User]),
        AuthModule,
        forwardRef(() => ProjectModule)
    ],
    controllers: [UserProjectController],
    providers: [UserProjectService],
    exports: [UserProjectService],
})
export class UserProjectModule {}
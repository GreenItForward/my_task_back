import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { ProjectModule } from "./project/project.module";
import { AuthModule } from "./user/auth/auth.module";
import { TaskModule } from "./project/task/task.module";
import { LabelModule } from "./project/label/label.module";
import { TaskLabelModule } from "./project/task-label/taskLabel.module";
import { RoleModule } from "@/api/user/role/role.module";
import { UserProjectModule } from "@/api/user/user-project/userProject.module";

@Module({
    imports: [
        ProjectModule,
        UserModule,
        AuthModule,
        TaskModule,
        LabelModule,
        TaskLabelModule,
        RoleModule,
        UserProjectModule
    ],
    controllers: [],
    providers: [],
})
export class ApiModule {}
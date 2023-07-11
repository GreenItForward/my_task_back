import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { ProjectModule } from "./project/project.module";
import { AuthModule } from "./user/auth/auth.module";
import { TaskModule } from "./project/task/task.module";
import { LabelModule } from "./project/label/label.module";
import { TaskLabelModule } from "./project/task-label/taskLabel.module";
import { UserProjectModule } from "@/api/user/user-project/userProject.module";
import { UserSettingModule } from "./user/user-setting/userSetting.module";

@Module({
    imports: [
        ProjectModule,
        UserModule,
        AuthModule,
        TaskModule,
        LabelModule,
        TaskLabelModule,
        UserProjectModule,
        UserSettingModule,
    ],
    controllers: [],
    providers: [],
})
export class ApiModule {}
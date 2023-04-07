import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./user/auth/auth.module";
import { TaskModule } from "./project/task/task.module";
import { StatusModule } from "./project/status/status.module";

@Module({
    imports: [UserModule, AuthModule, TaskModule, StatusModule],
    controllers: [],
    providers: [],
})
export class ApiModule {}
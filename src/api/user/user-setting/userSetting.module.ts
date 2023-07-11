import { UserSettingService } from '@/api/user/user-setting/userSetting.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Module, forwardRef} from "@nestjs/common";
import { UserSetting } from "./userSetting.entity";
import {AuthModule} from "@/api/user/auth/auth.module";
import {UserSettingController} from "@/api/user/user-setting/userSetting.controller";
import {Project} from "@/api/project/project.entity";
import {User} from "@/api/user/user.entity";
import {ProjectModule} from "@/api/project/project.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserSetting, User]),
    ],
    controllers: [UserSettingController],
    providers: [UserSettingService],
    exports: [UserSettingService],
})
export class UserSettingModule {}
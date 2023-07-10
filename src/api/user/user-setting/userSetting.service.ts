import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {DeepPartial, Repository} from "typeorm";
import {User} from "@/api/user/user.entity";
import { UserSetting } from "./userSetting.entity";
import { PostSettings } from "./userSetting.dto";

@Injectable()
export class UserSettingService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        @InjectRepository(UserSetting)
        private readonly userSettingRepo: Repository<UserSetting>,
    ) {}

    getSettings(user: User): Promise<UserSetting> {
        let userSetting = this.userSettingRepo.findOneBy({user: {id: user.id}});
        return userSetting ;
    }

    async postSettings(user: User, settings: PostSettings): Promise<UserSetting> {
        if (!settings) {
            throw new Error('Settings is null');
        }

        let settingRes = await this.userSettingRepo.findOneBy({user: {id: user.id}});
    
        const savedSettings = await this.userSettingRepo.save(settings as UserSetting);
        return savedSettings;
    }
    
    
      


}
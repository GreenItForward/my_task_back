import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserProject} from "@/api/user/user-project/userProject.entity";
import {Repository} from "typeorm";

@Injectable()
export class UserProjectService {
    @InjectRepository(UserProject)
    private readonly repository: Repository<UserProject>;



}
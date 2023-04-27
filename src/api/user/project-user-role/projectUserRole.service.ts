import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ProjectUserRole} from "@/api/user/project-user-role/projectUserRole.entity";
import {Repository} from "typeorm";

@Injectable()
export class ProjectUserRoleService {
    @InjectRepository(ProjectUserRole)
    private readonly repository: Repository<ProjectUserRole>;



}
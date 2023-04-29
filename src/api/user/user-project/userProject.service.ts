import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserProject} from "@/api/user/user-project/userProject.entity";
import {Repository} from "typeorm";
import {UserProjectDto} from "@/api/user/user-project/userProject.dto";
import {Project} from "@/api/project/project.entity";
import {User} from "@/api/user/user.entity";
import {Role} from "@/api/user/role/role.entity";

@Injectable()
export class UserProjectService {
    constructor(
        @InjectRepository(UserProject)
        private readonly repository: Repository<UserProject>,
        @InjectRepository(Project)
        private readonly projectRepo: Repository<Project>,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        @InjectRepository(Role)
        private readonly roleRepo: Repository<Role>,
    ) {}

    public async create(body: UserProjectDto): Promise<UserProject> {
        const userProject = new UserProject();

        userProject.project = await this.projectRepo.findOneBy({ "id": body.projectId });
        userProject.user = await this.userRepo.findOneBy({ "id": body.userId });
        userProject.role = await this.roleRepo.findOneBy({ "id": body.roleId });

        return this.repository.save(userProject);
    }
}
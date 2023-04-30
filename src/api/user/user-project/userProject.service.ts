import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserProject} from "@/api/user/user-project/userProject.entity";
import {Repository} from "typeorm";
import {ChangeRoleDto, JoinDto} from "@/api/user/user-project/userProject.dto";
import {Project} from "@/api/project/project.entity";
import {User} from "@/api/user/user.entity";
import {RoleEnum} from "@/common/enums/role.enum";
import {ProjectService} from "@/api/project/project.service";

@Injectable()
export class UserProjectService {
    constructor(
        @InjectRepository(UserProject)
        private readonly userProjectRepo: Repository<UserProject>,
        @InjectRepository(Project)
        private readonly projectRepo: Repository<Project>,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,

        private readonly projectService: ProjectService
    ) {}

    public async create(body: JoinDto, user: User): Promise<UserProject | never> {
        const userProject = new UserProject();

        userProject.project = await this.projectRepo.findOneBy({ "id": body.projectId });
        userProject.user = user;
        userProject.role = RoleEnum.MEMBRE;

        if(!userProject.project) {
            throw new NotFoundException("Projet introuvable");
        }

        const userInProject = await this.userProjectRepo
            .createQueryBuilder('userProject')
            .where('userProject.user = :user', { user: user.id })
            .andWhere('userProject.project = :project', { project: userProject.project.id })
            .leftJoinAndSelect('userProject.user', 'user')
            .getOne();
        if(userInProject) {
            throw new NotFoundException("Vous êtes déjà dans un projet");
        }
        if(body.codeJoin != userProject.project.codeJoin) {
            throw new NotFoundException("Code join invalide");
        }

        userProject.project = await this.projectRepo.save(userProject.project);
        userProject.project.codeJoin = await this.projectService.generateCodeJoin();
        return this.userProjectRepo.save(userProject);
    }


    public async changeRole(body: ChangeRoleDto, user: User): Promise<UserProject | never> {
        const userProject = new UserProject();

        let role = await this.userProjectRepo
            .createQueryBuilder('userProject')
            .where('userProject.user = :user', { user: user.id })
            .andWhere('userProject.project = :project', { project: body.projectId })
            .leftJoinAndSelect('userProject.user', 'user')
            .getOne();

        if(!role) {
            throw new NotFoundException("Vous n'êtes pas dans ce projet");
        }
        if(role.role != RoleEnum.ADMINISTRATEUR) {
            throw new NotFoundException("Vous n'avez pas les droits pour effectuer cette action");
        }

        role = await this.userProjectRepo
            .createQueryBuilder('userProject')
            .where('userProject.user = :user', { user: body.userId })
            .andWhere('userProject.project = :project', { project: body.projectId })
            .leftJoinAndSelect('userProject.user', 'user')
            .getOne();
        if(!role) {
            throw new NotFoundException("L'utilisateur que vous avez spécifié n'est pas dans ce projet");
        }

        userProject.id = role.id;
        userProject.project = await this.projectRepo.findOneBy({ "id": body.projectId });
        userProject.user = await this.userRepo.findOneBy({ "id": body.userId });
        userProject.role = body.role;

        return this.userProjectRepo.save(userProject);
    }
}
import {User} from '@/api/user/user.entity';
import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Project} from './project.entity';
import {CreateProjectDto} from './project.dto';
import {UserProject} from "@/api/user/user-project/userProject.entity";
import {RoleEnum} from "@/common/enums/role.enum";

@Injectable()
export class ProjectService {
  @InjectRepository(Project)
  private readonly projectRepo: Repository<Project>;
  @InjectRepository(User)
  private readonly userRepo: Repository<User>;
  @InjectRepository(UserProject)
  private readonly userProjectRepo: Repository<UserProject>;

  public async getAll(): Promise<Project[]> {
    return this.projectRepo.find();
  }

  public async create(body: CreateProjectDto, user: User): Promise<Project> {
    const project = new Project();
    project.nom = body.nom;
    project.description = body.description;
    project.codeJoin = await this.generateCodeJoin();
    project.user = user;

    const userProject = new UserProject();

    userProject.project = await this.projectRepo.save(project);
    userProject.user = user;
    userProject.role = RoleEnum.ADMINISTRATEUR;
    console.log(userProject);
    await this.userProjectRepo.save(userProject);

    return userProject.project;
  }

  public async update(projectId:number, body: CreateProjectDto, user: User): Promise<HttpException> {
    const project = await this.getProjectById(projectId);   
        
    if(await this.userProjectService.isInProject(project.id, user) === false) {
      throw new NotFoundException('Vous ne pouvez pas quitter un projet auquel vous ne participez pas.');
    }

    project.nom = !body.nom ? project.nom : body.nom;
    project.description = body.description;

    this.projectRepo.save(project);

    return new HttpException('Le projet a bien été modifié.', HttpStatus.OK);
  }

  public async generateCodeJoin(): Promise<string> {
    const length = 6;
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const allProjects = await this.getAll();
    const allCodes = allProjects.map((project) => project.codeJoin);
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return allCodes.includes(result) ? this.generateCodeJoin() : result;
  }

  public async getProjectById(id: number): Promise<Project> {
    const projectFound = await this.projectRepo.findOne({ where: { id }, relations: ['user'] });

    if (!projectFound) {
      throw new NotFoundException('Le projet demandé est introuvable.');
    }

    return projectFound;
  }

  public async getIdbyProject(project: Project): Promise<number> {
    if(!project) { 
      throw new NotFoundException('Le projet demandé est introuvable.');
    }

    const foundProject = await this.projectRepo.findOne({ where: { id: project.id } });

    if (!foundProject) {
      throw new NotFoundException('Le projet demandé est introuvable.');
    }

    return foundProject.id;
  }

  public async getAllByUser(user: User): Promise<Project[]> {
    const userId = user.id;
    const userProjects = await this.userProjectRepo.find({ where: { user: { id: userId } }, relations: ['project'] });
  
    if (!userProjects || userProjects.length === 0) {
      throw new NotFoundException('Aucun projet trouvé.');
    }
    return userProjects.map(userProject => userProject.project);
  }

  public async deleteByid(id: number, user: User): Promise<HttpException> {
    const project = await this.getProjectById(id);

    if (project.user.id !== user.id) {
      throw new NotFoundException('Vous n\'avez pas les droits pour supprimer ce projet.');
    }
    
    await this.projectRepo.delete(id);

    return new HttpException('Le projet a bien été supprimé.', HttpStatus.OK);
  }
  
}
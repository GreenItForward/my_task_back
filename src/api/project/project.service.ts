import { UserService } from '@/api/user/user.service';
import { User } from '@/api/user/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { Project } from './project.entity';
import { CreateProjectDto } from './project.dto';

@Injectable()
export class ProjectService {
  @InjectRepository(Project)
  private readonly repository: Repository<Project>;
  private readonly userService: UserService;

  public async getAll(): Promise<Project[]> {
    return this.repository.find();
  }

  public async create(body: CreateProjectDto, req: Request): Promise<Project> {
    const project = new Project();
    const user: User = <User>req.user;
    project.nom = body.nom;
    project.description = body.description;
    project.codeJoin = await this.generateCodeJoin();
    project.user = user;

    return this.repository.save(project);
  }

  public async update(project: Project): Promise<Project> {
    return this.repository.save(project);
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
    const projectFound = await this.repository.findOne({ where: { id }, relations: ['user'] });

    if (!projectFound) {
      throw new NotFoundException('Le projet demandé est introuvable.');
    }

    return projectFound;
  }

  public async getIdbyProject(project: Project): Promise<number> {
    if(!project) { 
      throw new NotFoundException('Le projet demandé est introuvable.');
    }

    const foundProject = await this.repository.findOne({ where: { id: project.id } });

    if (!foundProject) {
      throw new NotFoundException('Le projet demandé est introuvable.');
    }

    return foundProject.id;
  }

  public async getAllByUser(user: User): Promise<Project[]> {
    const userId = user.id;
    const projects = await this.repository.find({ where: { user: { id: userId } }, relations: ['user'] });
  
    if (!projects || projects.length === 0) {
      throw new NotFoundException('Aucun projet trouvé.');
    }
  
    return projects;
  }
  

}
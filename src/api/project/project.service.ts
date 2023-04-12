import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  @InjectRepository(Project)
  private readonly repository: Repository<Project>;

  public async getAll(): Promise<Project[]> {
    return this.repository.find();
  }

  public async create(project: Project): Promise<Project> {
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
    return await this.repository.findOneBy({ id });
  }

}
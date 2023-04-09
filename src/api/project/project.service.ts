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

  
}
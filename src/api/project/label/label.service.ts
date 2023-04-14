import { ProjectService } from './../project.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';

import { Label } from './label.entity';
import { CreateLabelDto } from './label.dto';
import { User } from '@/api/user/user.entity';
import { UserService } from '@/api/user/user.service';

@Injectable()
export class LabelService {

  constructor(
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
  
    @InjectRepository(Label)
    private readonly repository: Repository<Label>

  ) {}

  public async getAll(): Promise<Label[]> {
    return this.repository.find();
  }
  

  public async create(createLabelDto: CreateLabelDto, req: Request): Promise<Label> {
    const label = new Label();
    const user: User = <User>req.user;
    const project = await this.projectService.getProjectById(createLabelDto.projectId);
    const userId = await this.userService.getIdbyUser(project.user);
    label.nom = createLabelDto.nom;
    label.couleur = createLabelDto.couleur;
    label.project = project;

    if (userId !== user.id) {
      throw new NotFoundException('Vous n\'avez pas les droits pour créer un label dans ce projet.');
    }

    return this.repository.save(label);
  }
}
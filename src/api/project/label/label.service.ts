import { ProjectService } from './../project.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';

import { Label } from './label.entity';
import { CreateLabelDto } from './label.dto';

@Injectable()
export class LabelService {

  constructor(
    private readonly projectService: ProjectService,
  
    @InjectRepository(Label)
    private readonly repository: Repository<Label>

  ) {}

  public async getAll(): Promise<Label[]> {
    return this.repository.find();
  }
  

  public async create(createLabelDto: CreateLabelDto): Promise<Label> {
    const label = new Label();
    label.nom = createLabelDto.nom;
    label.couleur = createLabelDto.couleur;
    label.project = await this.projectService.getProjectById(createLabelDto.projectId);

    return this.repository.save(label);
  }
}
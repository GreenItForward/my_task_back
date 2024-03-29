import { ProjectService } from './../project.service';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Request } from 'express';

import { Label } from './label.entity';
import { CreateLabelDto } from './label.dto';
import { User } from '@/api/user/user.entity';
import { UserService } from '@/api/user/user.service';
import { TaskLabel } from '../task-label/taskLabel.entity';
import { UserProjectService } from '@/api/user/user-project/userProject.service';

@Injectable()
export class LabelService {

  constructor(
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
    private readonly userProjectService: UserProjectService,
  
    @InjectRepository(Label)
    private readonly repository: Repository<Label>,

    @InjectRepository(TaskLabel)
    private readonly taskLabelRepository: Repository<TaskLabel>

  ) {}

  public async getAll(projectID: number, user: User): Promise<Label[]> {
  return this.repository.find({ where: { project: { id: projectID } }, relations: ['project'] });
  }
  
  public async findOneById(id: number): Promise<Label> {
    return await this.repository.findOne({ where: { id }, relations: ['project'] });
  }
  
  public async create(createLabelDto: CreateLabelDto, user: User): Promise<Label> {
    const label = new Label();
    const project = await this.projectService.getProjectById(createLabelDto.projectId);
    const userId = await this.userService.getIdbyUser(project.user);
    label.nom = createLabelDto.nom;
    label.couleur = createLabelDto.couleur;
    label.project = project;

    if(!this.userProjectService.isInProject(project.id, user)) {
      throw new NotFoundException('Vous n\'êtes pas dans ce projet');
    }    

    return this.repository.save(label);
  }

  public async delete(labelId:number, user: User): Promise<HttpException> {
    const label = await this.findOneById(labelId);
    
    if (!label) {
      throw new NotFoundException('Le label demandé est introuvable.');
    }

    const labelAssociated = await this.taskLabelRepository.find({ where: { label: Equal(label.id) } });

    labelAssociated.forEach(async (taskLabel) => {
      await this.taskLabelRepository.delete(taskLabel.id);
    });


    await this.repository.remove(label);
    return new HttpException('Le label a bien été supprimé.', HttpStatus.OK);
  }

  public async update(labelId: number, createLabelDto: CreateLabelDto, user: User): Promise<Label> {
    const label = await this.findOneById(labelId);

    if (!label) {
      throw new NotFoundException('Le label demandé est introuvable.');
    }

    const project = await this.projectService.getProjectById(createLabelDto.projectId);

    if(await this.userProjectService.isInProject(project.id, user) === false) {
      throw new NotFoundException('Vous ne pouvez pas quitter un projet auquel vous ne participez pas.');
    }

    label.nom = createLabelDto.nom;
    label.couleur = createLabelDto.couleur;
    label.project = project;

    return this.repository.save(label);
  }
}
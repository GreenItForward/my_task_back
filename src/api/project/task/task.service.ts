import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';

import { Task } from './task.entity';
import { CreateTaskDto } from './task.dto';
import { User } from '@/api/user/user.entity';
import { UserService } from '@/api/user/user.service';
import { ProjectService } from '../project.service';
import { StatusEnum } from '@/common/enums/status.enum';

@Injectable()
export class TaskService {
  constructor(
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
    @InjectRepository(Task)
    private readonly repository: Repository<Task>
  ) {}

  public async getAll(): Promise<Task[]> {    
    return this.repository.find();
  }

  public async findOneById(id: number): Promise<Task> {
    const task = await this.repository.findOneBy({id});

    if (!task) {
      throw new NotFoundException('Tâche introuvable');
    }

    return this.repository.findOneBy({ id })
  }

  public async create(task: CreateTaskDto, req: Request): Promise<Task> {
    const newTask = new Task();
    const project = await this.projectService.getProjectById(task.projectID);
    const user: User = <User> req.user;
    const ownerId = await this.userService.getIdbyUser(project.user);

    if (ownerId !== user.id) {
      throw new NotFoundException('Vous n\'avez pas les droits pour créer une tâche dans ce projet.');
    }

    newTask.titre = task.title;
    newTask.description = task.description;
    newTask.date = new Date();
    newTask.user = user;
    newTask.project = project;
    newTask.status= task.status as StatusEnum;
    await this.projectService.getProjectById(task.projectID);
    return this.repository.save(newTask);
  }

  public async edit(task: CreateTaskDto, req: Request): Promise<Task> {
    const taskId = task.id;
    const existingTask = await this.repository.findOneBy({ id: taskId });
  
    if (!existingTask) {
      throw new NotFoundException('Tâche introuvable');
    }

    const project = await this.projectService.getProjectById(task.projectID);
    const user: User = <User> req.user;
    const ownerId = await this.userService.getIdbyUser(project.user);
  
    if (ownerId !== user.id) {
      throw new NotFoundException('Vous n\'avez pas les droits pour modifier cette tâche.');
    }
  
    existingTask.titre = task.title;
    existingTask.description = task.description;
    existingTask.date = new Date();
    existingTask.status = task.status as StatusEnum;
  
    return this.repository.save(existingTask);
  }

}
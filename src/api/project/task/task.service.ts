import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Request } from 'express';

import { Task } from './task.entity';
import { CreateTaskDto } from './task.dto';
import { User } from '@/api/user/user.entity';
import { UserService } from '@/api/user/user.service';
import { ProjectService } from '../project.service';

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
    return this.repository.findOneBy({ id })
  }

  public async create(task: CreateTaskDto): Promise<Task> {
    const newTask = new Task();
    newTask.titre = task.title;
    newTask.description = task.description;
    newTask.date = new Date();
    newTask.user = await this.userService.getUserById(task.user);
    newTask.project = await this.projectService.getProjectById(task.project);

    return this.repository.save(newTask);
  }

}
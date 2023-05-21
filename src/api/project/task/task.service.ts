import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { Task } from './task.entity';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { User } from '@/api/user/user.entity';
import { UserService } from '@/api/user/user.service';
import { ProjectService } from '../project.service';
import { StatusEnum } from '@/common/enums/status.enum';
import {UserProjectService} from "@/api/user/user-project/userProject.service";

@Injectable()
export class TaskService {
  constructor(
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
    private readonly userProjectService: UserProjectService,
    @InjectRepository(Task)
    private readonly repository: Repository<Task>
  ) {}

  public async getAll(): Promise<Task[]> {    
    return this.repository.find();
  }

  async findOneById(id: number): Promise<Task> {
    return await this.repository.findOne({where: {id}, relations: ['project']});
  }

  async deleteOneById(id: number, user: User): Promise<HttpException> {
    const task = await this.repository.findOne({ where: { id }, relations: ['project'] });

    if (!task) {
      throw new NotFoundException('Tâche introuvable');
    }
    
    await this.repository.delete(task.id)

    return new HttpException('Tâche supprimée', HttpStatus.OK);
  }

  public async getAllFromProject(project: number): Promise<Task[]>{
    return this.repository
      .createQueryBuilder('task')
      .where('task.projectId = :projectId', { projectId: project })
      .getMany();
  }
  public async create(task: CreateTaskDto, req: Request): Promise<Task> {
    const newTask = new Task();
    const project = await this.projectService.getProjectById(task.projectID);
    const user: User = <User> req.user;
    await this.userProjectService.getUsers(project.id, user);

    newTask.titre = task.title;
    newTask.description = task.description;
    newTask.date = new Date();
    newTask.project = project;
    newTask.status= task.status as StatusEnum;
    await this.projectService.getProjectById(task.projectID);
    return this.repository.save(newTask);
  }

  public async edit(task: UpdateTaskDto, req: Request): Promise<Task> {
    const taskId = task.id;
    const existingTask = await this.repository.findOneBy({ id: taskId });
   
    if (!existingTask) {
      throw new NotFoundException('Tâche introuvable');
    }

    const user: User = <User> req.user;
    if(!this.userProjectService.isInProject(task.projectID, user)) {
      throw new NotFoundException('Vous n\'êtes pas dans ce projet');
    }
  
    existingTask.titre = task.title ? task.title : existingTask.titre;
    existingTask.description = task.description ? task.description : existingTask.description;
    existingTask.date = new Date();
    existingTask.status = task.status as StatusEnum;

    if(task.userID && this.userProjectService.isInProject(task.projectID, user)) {
      existingTask.user = await this.userService.getUserById(task.userID);
    }else{
      existingTask.user = null;
    }
    existingTask.deadline = task.deadline;
  
    return this.repository.save(existingTask);
  }

}
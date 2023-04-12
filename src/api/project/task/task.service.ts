import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Request } from 'express';

import { Task } from './task.entity';

@Injectable()
export class TaskService {
  @InjectRepository(Task)
  private readonly repository: Repository<Task>;

  public async getAll(): Promise<Task[]> {
    return this.repository.find();
  }

  public async findOneById(id: string): Promise<Task> {
      const options: FindOneOptions<Task> = { where: { id: id } };
      return this.repository.findOne(options);
  }

  
}
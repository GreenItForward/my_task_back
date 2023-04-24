import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskLabel } from './taskLabel.entity';
import { AddLabelToTaskDto } from './taskLabel.dto';

import { Request } from 'express';

@Injectable()
export class TaskLabelService {
  constructor(
    @InjectRepository(TaskLabel)
    private readonly taskLabelRepository: Repository<TaskLabel>,
  //  private readonly taskService: TaskService,
  //  private readonly labelService: LabelService
  ) {}

  async addLabelToTask(taskLabel: AddLabelToTaskDto, req: Request): Promise<TaskLabel> { 
   // const newTaskLabel = new TaskLabel();

   // const task = await this.taskService.findOneById(taskLabel.taskId);
   // const label = await this.labelService.findOneById(taskLabel.labelId);


    //newTaskLabel.task = task;
    //newTaskLabel.label = label;

   // if (task.project.id !== label.project.id) {
     // throw new Error('Le label n\'est pas dans le même projet que la tâche');
   // }

    return null;
  }
} 
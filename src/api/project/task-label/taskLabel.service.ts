import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskLabel } from './taskLabel.entity';
import { Task } from '../task/task.entity';
import { Label } from '../label/label.entity';
import { AddLabelToTaskDto } from './taskLabel.dto';
import { TaskService } from '../task/task.service';
import { LabelService } from '../label/label.service';
import { ProjectService } from '../project.service';

@Injectable()
export class TaskLabelService {
  constructor(
   @InjectRepository(TaskLabel)
   private readonly taskLabelRepository: Repository<TaskLabel>,
   private readonly taskService: TaskService,
   private readonly labelService: LabelService,
   private readonly projectService: ProjectService,
  ) {}

  async addLabelToTask(taskLabel: AddLabelToTaskDto, req: Request): Promise<TaskLabel> { 
    const newTaskLabel = new TaskLabel();
    const task = await this.taskService.findOneById(taskLabel.taskId);
    if (!task || !task.project) {
      throw new NotFoundException("La tâche ou le projet n'existe pas");
    }

    const label = await this.labelService.findOneById(taskLabel.labelId);
    newTaskLabel.task = task;
    newTaskLabel.label = label;
    if (task.project.id !== label.project.id) {
      throw new NotFoundException('Le label n\'est pas dans le même projet que la tâche');
    }

    return await this.taskLabelRepository.save(newTaskLabel);
  }
} 
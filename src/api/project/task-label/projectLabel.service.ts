import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskLabel } from './projectLabel.entity';
import { Task } from '../task/task.entity';
import { Label } from '../label/label.entity';

@Injectable()
export class TaskLabelService {
  constructor(
    @InjectRepository(TaskLabel)
    private readonly projectLabelRepository: Repository<TaskLabel>
  ) {}

  async addLabelToTask(task: Task, label: Label): Promise<TaskLabel> {
    const taskLabel = new TaskLabel();
    taskLabel.task = task;
    taskLabel.label = label;

    if (task.project.id !== label.project.id) {
      throw new Error('Le label n\'est pas dans le même projet que la tâche');
    }

    return await this.projectLabelRepository.save(taskLabel);
  }
} 
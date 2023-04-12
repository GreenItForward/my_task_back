import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectLabel } from './projectLabel.entity';
import { Task } from '../task/task.entity';
import { Label } from '../label/label.entity';

@Injectable()
export class ProjectLabelService {
  constructor(
    @InjectRepository(ProjectLabel)
    private readonly projectLabelRepository: Repository<ProjectLabel>,
  ) {}

  async addLabelToTask(task: Task, label: Label): Promise<ProjectLabel> {
    const projectLabel = new ProjectLabel();
    projectLabel.task = task;
    projectLabel.label = label;

    return await this.projectLabelRepository.save(projectLabel);
  }
}
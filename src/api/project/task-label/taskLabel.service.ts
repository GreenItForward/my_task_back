import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { TaskLabel } from './taskLabel.entity';
import { UpdateLabelToTaskDto } from './taskLabel.dto';
import { TaskService } from '../task/task.service';
import { LabelService } from '../label/label.service';
import { ProjectService } from '../project.service';
import { User } from '@/api/user/user.entity';
import { join } from 'path';
import { Label } from '../label/label.entity';

@Injectable()
export class TaskLabelService {
  constructor(
   @InjectRepository(TaskLabel)
   private readonly taskLabelRepository: Repository<TaskLabel>,
   private readonly taskService: TaskService,
   private readonly labelService: LabelService,
   private readonly projectService: ProjectService,
  ) {}


/**
 * Add a label to a task or update it if it already exists ( PUT )
 * @param taskLabel 
 * @param req 
 * @returns 
 */
  async updateLabelToTask(taskLabel: UpdateLabelToTaskDto, user: User): Promise<HttpException> { 
    const newTaskLabel = new TaskLabel();
    const task = await this.taskService.findOneById(taskLabel.taskId);
    if (!task || !task.project) {
      throw new NotFoundException("La tâche ou le projet n'existe pas");
    }

    const label = await this.labelService.findOneById(taskLabel.labelId);
    newTaskLabel.task = task;
    newTaskLabel.label = label;

    if (!label) {
      throw new NotFoundException("Le label n'existe pas");
    }
     
    if (task.project.id !== label.project.id) {
      throw new NotFoundException('Le label n\'est pas dans le même projet que la tâche');
    }

    const existingTaskLabel = await this.taskLabelRepository.findOne({
      where: { task: Equal(taskLabel.taskId), label: Equal(taskLabel.labelId) },
    });
    
    if (existingTaskLabel) {
      await this.taskLabelRepository.delete(existingTaskLabel.id);
      throw new HttpException("Le label a été retiré de la tâche",HttpStatus.ACCEPTED);
    }

    await this.taskLabelRepository.save(newTaskLabel);
    throw new HttpException("Le label a été ajouté à la tâche",HttpStatus.CREATED);
    
  }

  async getAllByLabel(id: number) {
    return this.taskLabelRepository.find({ where: { label: Equal(id) }, relations: ['task'] });
  }

  async getAllLabelsOfTask(taskId: number): Promise<Label[]> {
    const taskLabels = await this.taskLabelRepository.find({ where: { taskId: taskId }, relations: ['label'] });
    const labels = taskLabels.map((taskLabel) => taskLabel.label);
    return labels;
  }
}
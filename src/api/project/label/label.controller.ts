import { Controller, Post, Body, Get } from '@nestjs/common';
import { LabelService } from './label.service';
import { ProjectLabelService } from '../project-label/projectLabel.service';
import { TaskService } from '../task/task.service';
import { CreateLabelDto } from './label.dto';
import { Label } from './label.entity';
import { ApiBody } from '@nestjs/swagger';

@Controller('labels')
export class LabelController {
  constructor(
    private readonly labelService: LabelService,
    private readonly projectLabelService: ProjectLabelService,
    private readonly taskService: TaskService,
  ) {}

  @Get()
  async getAll(): Promise<Label[]> {
    console.log('getAll');
    
    return this.labelService.getAll();
  }

  @Post()
  @ApiBody({ type: CreateLabelDto })
  async createLabel(@Body() createLabelDto: CreateLabelDto): Promise<Label> {
    // Créez un nouveau label en utilisant le service LabelService
    const label = await this.labelService.create(createLabelDto);

    // Récupérez l'instance de la tâche à laquelle vous souhaitez ajouter le label
    const task = await this.taskService.findOneById(createLabelDto.taskId);

    // Ajoutez le label à la tâche en utilisant le service ProjectLabelService
    await this.projectLabelService.addLabelToTask(task, label);

    return label;
  }
}
import { Controller, Post, Body, Get } from '@nestjs/common';
import { LabelService } from './label.service';
import { TaskLabelService } from '../task-label/projectLabel.service';
import { TaskService } from '../task/task.service';
import { CreateLabelDto } from './label.dto';
import { Label } from './label.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags("Label")
@Controller('label')
export class LabelController {
  constructor(
    private readonly labelService: LabelService,
    private readonly projectLabelService: TaskLabelService,
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
    const label = await this.labelService.create(createLabelDto);
    const task = await this.taskService.findOneById(createLabelDto.taskId);
    await this.projectLabelService.addLabelToTask(task, label);

    return label;
  }
}
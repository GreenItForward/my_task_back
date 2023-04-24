import { Controller, Post, Body, Get, Req, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { LabelService } from './label.service';
import { TaskService } from '../task/task.service';
import { CreateLabelDto } from './label.dto';
import { Label } from './label.entity';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';

@ApiTags("Label")
@Controller('label')
export class LabelController {
  constructor(
    private readonly labelService: LabelService,
    private readonly taskService: TaskService,
  ) {}

  @Get()
  async getAll(): Promise<Label[]> {
    console.log('getAll');
    
    return this.labelService.getAll();
  }

  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: CreateLabelDto })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async createLabel(@Body() body: CreateLabelDto, @Req() req: Request): Promise<Label> {
    const label = await this.labelService.create(body, req);

    return label;
  }  
}
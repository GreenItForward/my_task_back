import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors, Put, Body, Inject, Get, Post } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TaskLabelService } from './taskLabel.service';
import { AddLabelToTaskDto } from './taskLabel.dto';
import { TaskLabel } from './taskLabel.entity';

@ApiTags('TaskLabel')
@Controller('tasklabel')
export class TaskLabelController {

    @Inject(TaskLabelService)
    private readonly service: TaskLabelService;
  
}
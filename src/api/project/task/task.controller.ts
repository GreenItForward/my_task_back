import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors, Put, Body, Inject, Get, Post } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './task.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse } from '@nestjs/swagger';

@Controller('task')
export class TaskController {

    @Inject(TaskService)
    private readonly service: TaskService;

    @Get()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    private getAll(@Req() { user }: Request): Promise<Task[]> { 
        return this.service.getAll();
    }

    @Post()
    @ApiBearerAuth()
    @ApiBody({ type: CreateTaskDto })
    @ApiBadRequestResponse({ description: 'Create task failed' })
    @ApiOkResponse({ description: 'Create task success' })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    private create( @Body() task:CreateTaskDto, @Req() req: Request ): Promise<Task> {
        return this.service.create(task, req);
    }
  
}
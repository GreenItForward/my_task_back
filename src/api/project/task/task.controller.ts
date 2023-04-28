import {
    ClassSerializerInterceptor,
    Controller,
    Req,
    UseGuards,
    UseInterceptors,
    Put,
    Body,
    Inject,
    Get,
    Post,
    Param
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Task')
@Controller('task')
export class TaskController {

    @Inject(TaskService)
    private readonly service: TaskService;

    @Get()
    private getAll(@Req() { user }: Request): Promise<Task[]> { 
        return this.service.getAll();
    }

    @Get(':taskId')
    private async findOneById(@Param('taskId') taskId:number): Promise<Task> {
        if(taskId) return await this.service.findOneById(Number(taskId));
    }

    @Get('project/:projectId')
    private async findOneByProject(@Param('projectId') projectId:number): Promise<Task[]> {
        if(projectId) return await this.service.getAllFromProject(projectId)
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

    // edit a task
    @Put()
    @ApiBearerAuth()
    @ApiBody({ type: UpdateTaskDto })
    @ApiBadRequestResponse({ description: 'Edit task failed' })
    @ApiOkResponse({ description: 'Edit task success' })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    private edit( @Body() task: UpdateTaskDto, @Req() req: Request ): Promise<Task> {
        return this.service.edit(task, req);
    }
  
}
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
    Param, Delete, HttpException
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@/api/user/user.entity';

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
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    private async findOneByTaskId(@Param('taskId') taskId:number): Promise<Task> {
        if(taskId) return await this.service.findOneById(Number(taskId));
    }

    @Get('project/:projectId')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    private async findTasksByProject(@Param('projectId') projectId:number): Promise<Task[]> {
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

    @Delete(':taskId')
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Delete task success' })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    private async deleteOneById(@Param('taskId') taskId:number, @Req() { user } : Request): Promise<HttpException> {
        return await this.service.deleteOneById(Number(taskId), <User>user);
    }
}
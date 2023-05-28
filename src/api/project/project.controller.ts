import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors, Body, Inject, Get, Post, Param, HttpException, Delete } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { CreateProjectDto } from './project.dto';
import { UserService } from '../user/user.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '../user/user.entity';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
    @Inject(ProjectService)
    private readonly service: ProjectService;

    @Inject(UserService)
    private readonly userService: UserService;

    @Get('user')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all projects by user' })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async getAllByUser(@Req() { user }: Request): Promise<Project[]> {
        return this.service.getAllByUser(<User>user);
    }

    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create project' })
    @ApiBody({ type: CreateProjectDto })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    private async create(@Body() body:CreateProjectDto, @Req() { user }: Request): Promise<Project> {
        return this.service.create(body, <User>user);
    }

    
    @Post('update/:projectId')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update project' })
    @ApiBody({ type: CreateProjectDto })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    private async update(@Param("projectId") projectId : number, @Body() body:CreateProjectDto, @Req() { user }: Request): Promise<HttpException> {
        return this.service.update(projectId, body, <User>user);
    }

    @Delete('delete/:projectId')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete project' })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    private async delete(@Param("projectId") projectId : number, @Req() { user }: Request): Promise<HttpException> {
        return this.service.deleteByid(projectId, <User>user);
    }

    @Delete('leave/:projectId')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Leave project' })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    private async leave(@Param("projectId") projectId : number, @Req() { user }: Request): Promise<HttpException> {
        return this.service.leave(projectId, <User>user);
    }

   
}
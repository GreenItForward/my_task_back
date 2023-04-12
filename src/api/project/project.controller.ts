import { log } from 'console';
import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors, Put, Body, Inject, Get, Post } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { CreateProjectDto } from './project.dto';
import { userInfo } from 'os';
import { UserService } from '../user/user.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('project')
export class ProjectController {
    @Inject(ProjectService)
    private readonly service: ProjectService;

    @Inject(UserService)
    private readonly userService: UserService;

    @Get()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    private getAll(@Req() { user }: Request): Promise<Project[]> { 
        return this.service.getAll();
    }

    @Post()
   // @UseGuards(JwtAuthGuard)
   //  @UseInterceptors(ClassSerializerInterceptor)
    @ApiBody({ type: CreateProjectDto })
    private async create(@Body() body: CreateProjectDto): Promise<Project> {
        const project = new Project();
        project.nom = body.nom;
        project.description = body.description;
        project.codeJoin = await this.service.generateCodeJoin();
        project.user = await this.userService.getUserById(body.userId);

        return this.service.create(project); 

    }
   
}
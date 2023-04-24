import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors, Body, Inject, Get, Post } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { CreateProjectDto } from './project.dto';
import { UserService } from '../user/user.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from '../user/user.entity';

@ApiTags('Project')
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
    @ApiBearerAuth()
    @ApiBody({ type: CreateProjectDto })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    private async create(@Body() body:CreateProjectDto, @Req() req: Request ): Promise<Project> {
        return this.service.create(body, req); 
    }
   
}
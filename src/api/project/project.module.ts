import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { TaskModule } from './task/task.module';
import { StatusModule } from './status/status.module';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, User]), TaskModule, StatusModule],
  controllers: [ProjectController],
  providers: [ProjectService, UserService],
})
export class ProjectModule {}
import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { TaskModule } from './task/task.module';
import { StatusModule } from './status/status.module';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { LabelModule } from './label/label.module';
import { ProjectLabelModule } from './project-label/projectLabel.module';

// TODO: import projectlabel && label module, (pov je vais bien galérer)
@Module({
  imports: [TypeOrmModule.forFeature([Project, User]), TaskModule, StatusModule],
  controllers: [ProjectController],
  providers: [ProjectService, UserService],
})
export class ProjectModule {}
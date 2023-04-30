import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { UserModule } from '../user/user.module';
import {UserProject} from "@/api/user/user-project/userProject.entity";
import {User} from "@/api/user/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Project, User, UserProject]), UserModule],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
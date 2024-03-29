import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { UserModule } from '@/api/user/user.module';
import { ProjectModule } from '../project.module';
import {UserProjectModule} from "@/api/user/user-project/userProject.module";

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UserModule, ProjectModule, UserProjectModule],
  providers: [TaskService],
  controllers: [TaskController],
  exports: [TaskService],
})
export class TaskModule {}
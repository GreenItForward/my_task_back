import { Module, forwardRef } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { UserModule } from '../user/user.module';
import {UserProject} from "@/api/user/user-project/userProject.entity";
import {User} from "@/api/user/user.entity";
import {UserProjectModule} from "@/api/user/user-project/userProject.module";
import { Label } from './label/label.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, User, UserProject, Label]), 
    UserModule,
    forwardRef(() => UserProjectModule)
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
import { Module } from '@nestjs/common';
import { LabelController } from './label.controller';
import { LabelService } from './label.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Label } from './label.entity';
import { TaskLabelModule } from '../task-label/taskLabel.module';
import { TaskModule } from '../task/task.module';
import { ProjectModule } from '../project.module';
import { UserModule } from '@/api/user/user.module';
import { TaskLabel } from '../task-label/taskLabel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Label, TaskLabel]), TaskModule, ProjectModule, UserModule],
  providers: [LabelService],
  controllers: [LabelController],
  exports: [LabelService],
})
export class LabelModule {}
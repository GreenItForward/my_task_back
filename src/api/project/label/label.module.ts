import { Module } from '@nestjs/common';
import { LabelController } from './label.controller';
import { LabelService } from './label.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Label } from './label.entity';
import { TaskLabelModule } from '../task-label/projectLabel.module';
import { TaskModule } from '../task/task.module';
import { Task } from '../task/task.entity';
import { TaskLabel } from '../task-label/projectLabel.entity';
import { ProjectModule } from '../project.module';

@Module({
  imports: [TypeOrmModule.forFeature([Label]), TaskLabelModule, TaskModule, ProjectModule],
  controllers: [LabelController],
  providers: [LabelService],
})
export class LabelModule {}
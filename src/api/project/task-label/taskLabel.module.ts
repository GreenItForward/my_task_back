import { Module } from '@nestjs/common';
import { TaskLabel } from './taskLabel.entity';
import { ProjectService } from '../project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskLabelService } from './taskLabel.service';
import { TaskModule } from '../task/task.module';
import { LabelModule } from '../label/label.module';
import { TaskLabelController } from './taskLabel.controller';
import { ProjectModule } from '../project.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskLabel]), TaskModule, LabelModule, ProjectModule],
  controllers: [TaskLabelController],
  providers: [TaskLabelService], 
  exports: [TaskLabelService],
})
export class TaskLabelModule {}
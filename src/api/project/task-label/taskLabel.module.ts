import { Module } from '@nestjs/common';
import { TaskLabel } from './taskLabel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskLabelService } from './taskLabel.service';
import { TaskModule } from '../task/task.module';
import { LabelModule } from '../label/label.module';
import { TaskLabelController } from './taskLabel.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TaskLabel]), TaskModule, LabelModule],
  providers: [TaskLabelService], 
  controllers: [TaskLabelController],
  exports: [TaskLabelService],
})
export class TaskLabelModule {}
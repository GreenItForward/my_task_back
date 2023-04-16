import { Module } from '@nestjs/common';
import { TaskLabel } from './projectLabel.entity';
import { ProjectService } from '../project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskLabelService } from './projectLabel.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskLabel])],
  controllers: [],
  providers: [TaskLabelService], 
  exports: [TaskLabelService],
})
export class TaskLabelModule {}
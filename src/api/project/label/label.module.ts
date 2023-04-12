import { Module } from '@nestjs/common';
import { LabelController } from './label.controller';
import { LabelService } from './label.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Label } from './label.entity';
import { ProjectLabelModule } from '../project-label/projectLabel.module';
import { TaskModule } from '../task/task.module';
import { ProjectLabel } from '../project-label/projectLabel.entity';
import { Task } from '../task/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Label])],
  controllers: [LabelController],
  providers: [LabelService],
})
export class LabelModule {}
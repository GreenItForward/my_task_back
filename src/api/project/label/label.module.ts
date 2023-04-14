import { Module } from '@nestjs/common';
import { LabelController } from './label.controller';
import { LabelService } from './label.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Label } from './label.entity';
import { TaskLabelModule } from '../task-label/projectLabel.module';
import { TaskModule } from '../task/task.module';
import { ProjectModule } from '../project.module';
import { UserModule } from '@/api/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Label]), TaskLabelModule, TaskModule, ProjectModule, UserModule],
  controllers: [LabelController],
  providers: [LabelService],
})
export class LabelModule {}
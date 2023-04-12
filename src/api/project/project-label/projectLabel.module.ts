import { Module } from '@nestjs/common';
import { ProjectLabel } from './projectLabel.entity';
import { ProjectService } from '../project.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectLabel])],
  controllers: [],
  providers: [ProjectService],
})
export class ProjectLabelModule {}
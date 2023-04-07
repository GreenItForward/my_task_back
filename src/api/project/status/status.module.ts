import { Module } from '@nestjs/common';
import { StatusController } from '../status/status.controller';
import { StatusService } from './status.service';
import { Status } from './status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Status])],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}
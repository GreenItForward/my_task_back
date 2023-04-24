import { Module } from '@nestjs/common';
import { UserModule } from './api/user/user.module';
import { ApiModule } from './api/api.module';
import { getEnvPath } from './common/helper/env.helper';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './api/user/auth/auth.module';
import { TaskModule } from './api/project/task/task.module';
import { LabelModule } from './api/project/label/label.module';
import { TaskLabelModule } from './api/project/task-label/taskLabel.module';

const envFilePath: string = getEnvPath(`${process.cwd()}`);
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ApiModule,
    UserModule,
    AuthModule,
    TaskModule,
    LabelModule,
    TaskLabelModule
  ],
}) 
export class AppModule {}
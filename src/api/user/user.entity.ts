import { Exclude } from 'class-transformer';
import {BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Task } from '../project/task/task.entity';
import { Project } from '../project/project.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserSetting } from './user-setting/userSetting.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id!: number;

  @Column({ type: 'varchar' })
  @ApiProperty()
  public email!: string;

  @Exclude()
  @Column({ type: 'varchar' })
  @ApiProperty()
  public password!: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  public name: string | null;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  public firstname: string | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  @ApiProperty()
  public lastLoginAt: Date | null;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @OneToMany(() => Project , (project) => project.user)
  projects: Project[];

  @OneToOne(() => UserSetting, setting => setting.user)
  @JoinColumn()
  settings: Promise<UserSetting>;
}
import { User } from '@/api/user/user.entity';
import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../project.entity';
import { TaskLabel } from '../task-label/projectLabel.entity';
import { StatusEnum } from '../../../common/enums/status.enum';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titre: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column({
    type: 'enum',
    enum: StatusEnum,
  })
  status: StatusEnum;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @OneToMany(() => TaskLabel, (taskLabel) => taskLabel.task)
  projectLabels: TaskLabel[];
}
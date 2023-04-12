import { User } from '@/api/user/user.entity';
import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../project.entity';
import { ProjectLabel } from '../project-label/projectLabel.entity';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  titre: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @OneToMany(() => ProjectLabel, (projectLabel) => projectLabel.task)
  projectLabels: ProjectLabel[];
}
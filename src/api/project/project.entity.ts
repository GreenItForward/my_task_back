import { User } from '@/api/user/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './task/task.entity';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  nom: string;

  @Column()
  description: string;

  @Column()
  codeJoin: string;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
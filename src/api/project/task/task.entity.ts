import { User } from '@/api/user/user.entity';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../project.entity';
import { TaskLabel } from '../task-label/taskLabel.entity';
import { StatusEnum } from '../../../common/enums/status.enum';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
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

  @Column({ nullable: true })
  deadline: Date | null;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @Column()
  projectId: number;

  @ManyToOne(() => Project, (project) => project.tasks, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @OneToMany(() => TaskLabel, (taskLabel) => taskLabel.task)
  taskLabels: TaskLabel[];
}
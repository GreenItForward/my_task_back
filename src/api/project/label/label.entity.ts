import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from '../project.entity';
import { TaskLabel } from '../task-label/projectLabel.entity';

@Entity()
export class Label extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  nom: string;

  @Column()
  couleur: string;

  @ManyToOne(() => Project, (project) => project.labels)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @OneToMany(() => TaskLabel, (taskLabel) => taskLabel.label)
  projectLabels: TaskLabel[];
}
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
import { TaskLabel } from '../task-label/taskLabel.entity';

@Entity()
export class Label extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column( { nullable: false } )
  nom: string;

  @Column( { nullable: false } )
  couleur: string;

  @ManyToOne(() => Project, (project) => project.labels, { nullable: false } )
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @OneToMany(() => TaskLabel, (taskLabel) => taskLabel.label)
  taskLabels: TaskLabel[];
}
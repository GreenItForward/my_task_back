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
import { ProjectLabel } from '../project-label/projectLabel.entity';

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

  @OneToMany(() => ProjectLabel, (projectLabel) => projectLabel.label)
  projectLabels: ProjectLabel[];
}
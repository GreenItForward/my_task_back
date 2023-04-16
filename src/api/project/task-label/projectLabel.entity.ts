import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Task } from '../task/task.entity';
  import { Label } from '../label/label.entity';
  
  @Entity()
  export class TaskLabel {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Task, (task) => task.projectLabels, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'taskId' })
    task: Task;
  
    @ManyToOne(() => Label, (label) => label.taskLabels, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'labelId' })
    label: Label;
  }
  
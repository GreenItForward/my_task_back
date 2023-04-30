import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Column,
  } from 'typeorm';
  import { Task } from '../task/task.entity';
  import { Label } from '../label/label.entity';
  
  @Entity()
  export class TaskLabel {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    taskId: number;

    @Column()
    labelId: number;
    
    @ManyToOne(() => Task, (task) => task.taskLabels, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'taskId' })
    task: Task;
  
    @ManyToOne(() => Label, (label) => label.taskLabels, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'labelId' })
    label: Label;
  }
  
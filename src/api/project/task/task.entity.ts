import { User } from '@/api/user/user.entity';
import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
  taches: Task[];
}
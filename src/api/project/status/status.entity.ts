import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StatusEnum } from './status.enum';

@Entity('status')
export class Status extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    unique: true,
  })
  nom: StatusEnum;
}

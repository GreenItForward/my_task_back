import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';
import { StatusEnum } from './status.enum';

@Entity('status')
export class Status extends BaseEntity {
  @PrimaryColumn({
    type: 'enum',
    enum: StatusEnum,
    unique: true,
  })
  nom: StatusEnum;
}
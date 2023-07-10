import { Exclude } from "class-transformer";
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class UserSetting extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id!: number;

  @OneToOne(() => User)
  @JoinColumn()
  @ApiProperty()
  public user!: Promise<User>;

  @Column({ nullable: true })
  @ApiProperty()
  public background!: string;
}

import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "@/api/user/user.entity";

@Entity()
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    public id!: number;

    @Column({ type: 'varchar' })
    @ApiProperty()
    public libelle!: string;

    @OneToMany(() => User, (user) => user.role)
    users: User[];
}
import {Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column} from 'typeorm';
import { Project } from "@/api/project/project.entity";
import { User } from "@/api/user/user.entity";
import {RoleEnum} from "@/common/enums/role.enum";

@Entity()
export class UserProject {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Project, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'project_id' })
    project: Project;

    @Column({
        type: 'enum',
        enum: RoleEnum,
        default: RoleEnum.MEMBRE,
    })
    role: RoleEnum;
}

import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from "@/api/project/project.entity";
import { User } from "@/api/user/user.entity";
import { Role } from "@/api/user/role/role.entity";

@Entity()
export class UserProject {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Project)
    @JoinColumn({ name: 'project_id' })
    project: Project;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Role)
    @JoinColumn({ name: 'role_id' })
    role: Role;
}

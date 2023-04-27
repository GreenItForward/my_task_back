import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {Role} from "@/api/user/role/role.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateRoleDto} from "@/api/user/role/role.dto";

@Injectable()
export class RoleService {
    @InjectRepository(Role)
    private readonly repository: Repository<Role>;

    public async create(body: CreateRoleDto): Promise<Role> {
        const role = new Role();
        role.libelle = body.libelle;
        return this.repository.save(role);
    }
}
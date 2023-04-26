import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {Role} from "@/api/user/role/role.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class RoleService {
    @InjectRepository(Role)
    private readonly repository: Repository<Role>;



}
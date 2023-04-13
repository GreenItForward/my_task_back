import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { UpdateNameDto } from './user.dto';
import { User } from './user.entity';
import { Project } from '../project/project.entity';

@Injectable()
export class UserService {

  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public async updateName(body: UpdateNameDto, req: Request): Promise<User> {
    const user: User = <User>req.user;

    user.name = body.name;

    return this.repository.save(user);
  }

  public async getUserById(id: number): Promise<User> {
    return await this.repository.findOneBy({ id });
  }

  public async getIdbyUser(user: User): Promise<number> {
    if(!user) {
      throw new NotFoundException('L\'utilisateur demandé est un utilisateur anonyme.');
    }

    const foundUser = await this.repository.findOne({ where: { id: user.id } });
  
    if (!foundUser) {
      throw new NotFoundException('L\'utilisateur demandé est introuvable.');
    }
  
    return foundUser.id;
  }

}
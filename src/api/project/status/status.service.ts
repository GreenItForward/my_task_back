import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';

import { Status } from './status.entity';

@Injectable()
export class StatusService {
  @InjectRepository(Status)
  private readonly repository: Repository<Status>;

  public async getAll(): Promise<Status[]> {
    return this.repository.find();
  }
  
}
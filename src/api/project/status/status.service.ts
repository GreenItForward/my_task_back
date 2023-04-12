import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';

import { Status } from './status.entity';
import { StatusEnum } from './status.enum';

@Injectable()
export class StatusService {

  constructor(@InjectRepository(Status) private readonly repository: Repository<Status>) {
    this.checkAndInsertMissingStatus(); 
  }

  public async checkAndInsertMissingStatus(): Promise<void> {
    const status = await this.repository.find();
    if (!status || status.length < Object.values(StatusEnum).length) {
      const statusEnum = Object.values(StatusEnum);
      statusEnum.forEach(async (status) => {
        const statusInDb = await this.repository.findOneBy({ nom: status });
        if (!statusInDb) {
          let newStatus = new Status();
          newStatus.nom = status;
          await this.repository.save(newStatus);
        }
      });
    }
  }
  
  public async getAll(): Promise<Status[]> {
    await this.checkAndInsertMissingStatus();
    return this.repository.find();
  }
  
}
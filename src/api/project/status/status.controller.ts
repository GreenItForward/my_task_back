import { Controller, Get } from "@nestjs/common";
import { Status } from "./status.entity";
import { StatusService } from "./status.service";

@Controller('status')
export class StatusController { 
    constructor(private readonly statusService: StatusService) {}
    
    @Get()
    public async getAll(): Promise<Status[]> {
        return this.statusService.getAll();
    }

}
    
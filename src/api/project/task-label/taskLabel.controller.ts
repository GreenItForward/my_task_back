import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors, Put, Body, Inject, Get, Post } from '@nestjs/common';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TaskLabelService } from './taskLabel.service';
import { AddLabelToTaskDto } from './taskLabel.dto';
import { TaskLabel } from './taskLabel.entity';

@ApiTags('Task Label')
@Controller('task-label')
export class TaskLabelController {

    @Inject(TaskLabelService)
    private readonly service: TaskLabelService;

    @Post()
    @ApiBearerAuth()
    @ApiBody({ type: AddLabelToTaskDto })
    @ApiBadRequestResponse({ description: 'Create task label failed' })
    @ApiOkResponse({ description: 'Create task label success' })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    private addLabelToTask( @Body() taskLabel:AddLabelToTaskDto, @Req() req: Request ): Promise<TaskLabel> {
        return this.service.addLabelToTask(taskLabel, req);
    }
  
}
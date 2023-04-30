import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors, Put, Body, Inject, HttpException, UseFilters, Delete, Param, Get} from '@nestjs/common';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TaskLabelService } from './taskLabel.service';
import { UpdateLabelToTaskDto } from './taskLabel.dto';
import { Request } from 'express';
import { User } from '@/api/user/user.entity';
import { Label } from '../label/label.entity';

@ApiTags('Task Label')
@Controller('task-label')
export class TaskLabelController {

    @Inject(TaskLabelService)
    private readonly service: TaskLabelService;

    @Put()
    @ApiBearerAuth()
    @ApiBody({ type: UpdateLabelToTaskDto })
    @ApiBadRequestResponse({ description: 'Create task label failed' })
    @ApiOkResponse({ description: 'Create task label success' })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    private updateLabelToTask( @Body() taskLabel:UpdateLabelToTaskDto, @Req() { user }: Request ): Promise<HttpException> {
        return this.service.updateLabelToTask(taskLabel, <User>user);
    }

    @Get(':taskId')
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Get all label of task success' })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    private getAllLabelOfTask( @Param('taskId') taskId: number, @Req() { user }: Request ): Promise<Label[]> {
        return this.service.getAllLabelsOfTask(taskId);
    }

  
}
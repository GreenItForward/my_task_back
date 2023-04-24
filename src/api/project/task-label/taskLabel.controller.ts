import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors, Put, Body, Inject, HttpException, UseFilters} from '@nestjs/common';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TaskLabelService } from './taskLabel.service';
import { UpdateLabelToTaskDto } from './taskLabel.dto';
import { TaskLabel } from './taskLabel.entity';

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
    private updateLabelToTask( @Body() taskLabel:UpdateLabelToTaskDto, @Req() req: Request ): Promise<HttpException> {
        return this.service.updateLabelToTask(taskLabel, req);
    }
  
}
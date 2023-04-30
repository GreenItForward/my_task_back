import { Controller, Post, Body, Get, Req, UseGuards, UseInterceptors, ClassSerializerInterceptor, Param, Delete, HttpException } from '@nestjs/common';
import { LabelService } from './label.service';
import { TaskService } from '../task/task.service';
import { CreateLabelDto } from './label.dto';
import { Label } from './label.entity';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { User } from '@/api/user/user.entity';

@ApiTags("Label")
@Controller('label')
export class LabelController {
  constructor(
    private readonly labelService: LabelService,
    private readonly taskService: TaskService,
  ) {}

  @Get(':projectID')
  @ApiBearerAuth()
  @ApiParam({ name: 'projectID', type: 'integer', required: true })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getAll(@Param('projectID') id: number, @Req() { user }: Request): Promise<Label[]> {
    return this.labelService.getAll(id, <User>user);
  }
  
  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: CreateLabelDto })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async createLabel(@Body() body: CreateLabelDto, @Req() { user }: Request): Promise<Label> {
    const label = await this.labelService.create(body, <User>user);
    return label;
  }  

  @Delete(':labelId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async deleteLabel(@Param('labelId') labelId: number, @Req() { user }: Request): Promise<HttpException> {    
    return this.labelService.delete(labelId, <User>user);
  }

  @Post(':labelId')
  @ApiBearerAuth()
  @ApiBody({ type: CreateLabelDto })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async updateLabel(@Param('labelId') labelId: number, @Body() body: CreateLabelDto, @Req() { user }: Request): Promise<Label> {
    const label = await this.labelService.update(labelId, body, <User>user);
    return label;
  }
  
}
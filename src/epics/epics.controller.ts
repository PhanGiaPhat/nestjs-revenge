import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EpicsService } from './epics.service';
import { CreateEpicDto } from './dto/create-epic.dto';
import { UpdateEpicDto } from './dto/update-epic.dto';

@Controller('epics')
export class EpicsController {
  constructor(private readonly epicsService: EpicsService) {}

  @Post()
  async create(@Body() createEpicDto: CreateEpicDto) {
    return await this.epicsService.create(createEpicDto);
  }

  @Get()
  async findAll() {
    return await this.epicsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.epicsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEpicDto: UpdateEpicDto) {
    return await this.epicsService.update(id, updateEpicDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.epicsService.remove(id);
  }

  @Patch(':id/users/:userId')
  async assign(@Param('id') id: string, @Param('userId') userId: string) {
    return await this.epicsService.assign(id, userId);
  }

  @Delete(':id/users')
  async unAssign(@Param('id') id: string) {
    return await this.epicsService.unAssign(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { EpicEntity } from '../epics/entities/epic.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
    @InjectRepository(EpicEntity)
    private epicsRepository: Repository<EpicEntity>,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    return await this.tasksRepository.save(createTaskDto);
  }

  async findAll() {
    return await this.tasksRepository.find({
      relations: {
        epic: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.tasksRepository.findOne({
      where: { id: id },
      relations: {
        epic: true,
      },
    });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return await this.tasksRepository.save({
      id: id,
      updateTaskDto,
    });
  }

  async remove(id: string) {
    return await this.tasksRepository.delete({ id: id });
  }

  async link(id: string, epicId: string) {
    const task = await this.tasksRepository.findOne({
      where: {
        id: id,
      },
    });

    task.epic = await this.epicsRepository.findOne({
      where: {
        id: epicId,
      },
    });

    return this.tasksRepository.save(task);
  }

  async unLink(id: string) {
    const task = await this.tasksRepository.findOne({
      where: {
        id: id,
      },
    });

    task.epic = null;

    return this.tasksRepository.save(task);
  }
}

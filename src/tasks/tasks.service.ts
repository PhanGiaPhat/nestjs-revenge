import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    return await this.tasksRepository.save(createTaskDto);
  }

  async findAll() {
    return await this.tasksRepository.find();
  }

  async findOne(id: string) {
    return await this.tasksRepository.findOne({ where: { id: id } });
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
}

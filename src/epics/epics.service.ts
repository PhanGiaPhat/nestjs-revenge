import { Injectable } from '@nestjs/common';
import { CreateEpicDto } from './dto/create-epic.dto';
import { UpdateEpicDto } from './dto/update-epic.dto';
import { EpicEntity } from './entities/epic.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class EpicsService {
  constructor(
    @InjectRepository(EpicEntity)
    private epicsRepository: Repository<EpicEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}
  async create(createEpicDto: CreateEpicDto) {
    return await this.epicsRepository.save(createEpicDto);
  }

  async findAll() {
    return await this.epicsRepository.find({
      relations: {
        user: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.epicsRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
      },
    });
  }

  async update(id: string, updateEpicDto: UpdateEpicDto) {
    return await this.epicsRepository.save({
      id: id,
      updateEpicDto,
    });
  }

  async remove(id: string) {
    return await this.epicsRepository.delete({ id: id });
  }

  async assign(id: string, userId: string) {
    const epic = await this.epicsRepository.findOne({
      where: {
        id: id,
      },
    });

    epic.user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });

    return this.epicsRepository.save(epic);
  }

  async unAssign(id: string) {
    const epic = await this.epicsRepository.findOne({
      where: {
        id: id,
      },
    });

    epic.user = null;

    return this.epicsRepository.save(epic);
  }
}

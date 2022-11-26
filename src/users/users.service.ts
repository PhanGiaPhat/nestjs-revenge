import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.save(createUserDto);
  }

  async findAll() {
    return await this.usersRepository.find({
      relations: {
        epics: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.usersRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        epics: true,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.save({
      id: id,
      updateUserDto,
    });
  }

  async remove(id: string) {
    return await this.usersRepository.delete({ id: id });
  }
}

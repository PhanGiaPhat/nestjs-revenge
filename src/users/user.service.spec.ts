import { NotBrackets, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('User Service', () => {
  const mockReturn = { id: 1 };

  let usersService: UsersService;
  const repo = createMock<Repository<UserEntity>>({
    find: jest.fn().mockReturnValue([mockReturn]),
    findOne: jest.fn().mockReturnValue(mockReturn),
    save: jest.fn().mockReturnValue(mockReturn),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: repo,
        },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
  });

  afterEach(jest.clearAllMocks);

  it('Create user function should work well', async () => {
    const user = {
      id: 'id',
      name: 'name',
    };

    const result = await usersService.create(user);
    expect(repo.save).toBeCalledTimes(1);
    expect(repo.save).toBeCalledWith(user);

    expect(result).toEqual(mockReturn);
  });

  it('findAll user function should work well', async () => {
    const result = await usersService.findAll();

    expect(repo.find).toBeCalledTimes(1);

    expect(result).toEqual([mockReturn]);
  });

  it('findOne user function should work well', async () => {
    const id = 'id';

    const result = await usersService.findOne(id);

    expect(repo.findOne).toBeCalledTimes(1);

    expect(result).toEqual(mockReturn);
  });

  it('Update user function should work well', async () => {
    const id = 'id';
    const user: UpdateUserDto = {
      name: 'name',
    };

    const result = await usersService.update(id, user);

    expect(repo.save).toBeCalledTimes(1);
    expect(repo.save).toBeCalledWith({ id: id, updateUserDto: user });

    expect(result).toEqual(mockReturn);
  });

  it('Remove user function should work well', async () => {
    const id = 'id';
    const result = await usersService.remove(id);

    expect(repo.delete).toBeCalledTimes(1);
    expect(repo.delete).toBeCalledWith({ id: id });
  });
});

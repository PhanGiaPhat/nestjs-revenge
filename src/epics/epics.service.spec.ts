import { Repository } from 'typeorm';
import { EpicEntity } from './entities/epic.entity';
import { EpicsService } from './epics.service';
import { createMock } from '@golevelup/ts-jest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { UserEntity } from '../users/entities/user.entity';
import { UpdateEpicDto } from './dto/update-epic.dto';
import { useContainer } from 'class-validator';

describe('Epics Service', () => {
  const mockReturn = { id: 1 };

  let epicsService: EpicsService;

  const epicRepo = createMock<Repository<EpicEntity>>({
    find: jest.fn().mockReturnValue([mockReturn]),
    findOne: jest.fn().mockReturnValue(mockReturn),
    save: jest.fn().mockReturnValue(mockReturn),
    delete: jest.fn(),
  });

  const userRepo = createMock<Repository<EpicEntity>>({
    find: jest.fn().mockReturnValue([mockReturn]),
    findOne: jest.fn().mockReturnValue(mockReturn),
    save: jest.fn().mockReturnValue(mockReturn),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        EpicsService,
        {
          provide: getRepositoryToken(EpicEntity),
          useValue: epicRepo,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: userRepo,
        },
      ],
    }).compile();

    epicsService = moduleRef.get<EpicsService>(EpicsService);
  });

  afterEach(jest.clearAllMocks);

  it('Create epic function should work well', async () => {
    const epic = {
      label: 'label',
      name: 'name',
    };

    const result = await epicsService.create(epic);
    expect(epicRepo.save).toBeCalledTimes(1);
    expect(epicRepo.save).toBeCalledWith(epic);

    expect(result).toEqual(mockReturn);
  });

  it('findAll epic function should work well', async () => {
    const result = await epicsService.findAll();

    expect(epicRepo.find).toBeCalledTimes(1);

    expect(result).toEqual([mockReturn]);
  });

  it('findOne epic function should work well', async () => {
    const id = 'id';

    const result = await epicsService.findOne(id);

    expect(epicRepo.findOne).toBeCalledTimes(1);

    expect(result).toEqual(mockReturn);
  });

  it('Update epic function should work well', async () => {
    const id = 'id';
    const epic: UpdateEpicDto = {
      name: 'name',
      label: 'label',
    };

    const result = await epicsService.update(id, epic);

    expect(epicRepo.save).toBeCalledTimes(1);
    expect(epicRepo.save).toBeCalledWith({ id: id, updateEpicDto: epic });

    expect(result).toEqual(mockReturn);
  });

  it('Remove epic function should work well', async () => {
    const id = 'id';
    const result = await epicsService.remove(id);

    expect(epicRepo.delete).toBeCalledTimes(1);
    expect(epicRepo.delete).toBeCalledWith({ id: id });
  });

  it('Assign function should work well', async () => {
    const epicId = 'epicId';
    const userId = 'userId';

    const result = await epicsService.assign(epicId, userId);

    expect(userRepo.findOne).toBeCalledTimes(1);

    expect(epicRepo.findOne).toBeCalledTimes(1);

    expect(epicRepo.save).toBeCalledTimes(1);

    expect(result).toEqual(mockReturn);
  });

  it('Unassign function should work well', async () => {
    const epicId = 'epicId';

    const result = await epicsService.unAssign(epicId);

    expect(epicRepo.findOne).toBeCalledTimes(1);

    expect(epicRepo.save).toBeCalledTimes(1);

    expect(result).toEqual(mockReturn);
  });
});

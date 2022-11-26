import { Test } from '@nestjs/testing';
import { CreateEpicDto } from './dto/create-epic.dto';
import { EpicsController } from './epics.controller';
import { EpicsService } from './epics.service';

describe('Epics Controller', () => {
  let epicsController: EpicsController;
  let epicsService: EpicsService;

  const mockEpic: CreateEpicDto = {
    name: 'name',
    label: 'label',
  };

  const mockEpicAssign = {
    name: 'name',
    label: 'label',
    user: 'user',
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [EpicsController],
      providers: [
        {
          provide: EpicsService,
          useValue: {
            create: jest.fn().mockResolvedValueOnce(mockEpic),
            findAll: jest.fn().mockResolvedValueOnce([mockEpic]),
            findOne: jest.fn().mockResolvedValueOnce(mockEpic),
            update: jest.fn().mockResolvedValueOnce(mockEpic),
            remove: jest.fn().mockResolvedValueOnce({ message: 'ok' }),
            assign: jest.fn().mockResolvedValueOnce(mockEpicAssign),
            unAssign: jest.fn().mockResolvedValueOnce(mockEpicAssign),
          },
        },
      ],
    }).compile();

    epicsController = moduleRef.get<EpicsController>(EpicsController);
    epicsService = moduleRef.get<EpicsService>(EpicsService);
  });

  afterEach(jest.clearAllMocks);

  it('Create Epic function should work well', async () => {
    const epicDto: CreateEpicDto = {
      name: 'name',
      label: 'label',
    };

    const result = await epicsController.create(epicDto);

    expect(epicsService.create).toBeCalledTimes(1);
    expect(epicsService.create).toBeCalledWith(epicDto);

    expect(result).toEqual(mockEpic);
  });

  it('findAll epic function should work well', async () => {
    const result = await epicsController.findAll();

    expect(epicsService.findAll).toBeCalledTimes(1);

    expect(result).toEqual([mockEpic]);
  });

  it('findOne epic function should work well', async () => {
    const id = '1';

    const result = await epicsController.findOne(id);

    expect(epicsService.findOne).toBeCalledTimes(1);
    expect(epicsService.findOne).toBeCalledWith(id);

    expect(result).toEqual(mockEpic);
  });

  it('Update epic function should work well', async () => {
    const id = '1';
    const epicDto: CreateEpicDto = {
      name: 'name',
      label: 'label',
    };

    const result = await epicsController.update(id, epicDto);

    expect(epicsService.update).toBeCalledTimes(1);
    expect(epicsService.update).toBeCalledWith(id, epicDto);

    expect(result).toEqual(epicDto);
  });

  it('Remove epic function should work well', async () => {
    const id = '1';

    const result = await epicsController.remove(id);

    expect(epicsService.remove).toBeCalledTimes(1);

    expect(result).toEqual({ message: 'ok' });
  });

  it('Assign user function should work well', async () => {
    const epicId = 'epicId';
    const userId = 'userId';

    const result = await epicsController.assign(epicId, userId);

    expect(epicsService.assign).toBeCalledTimes(1);
    expect(epicsService.assign).toBeCalledWith(epicId, userId);

    expect(result).toEqual(mockEpicAssign);
  });

  it('Unassign user function should work well', async () => {
    const epicId = 'epicId';

    const result = await epicsController.unAssign(epicId);

    expect(epicsService.unAssign).toBeCalledTimes(1);
    expect(epicsService.unAssign).toBeCalledWith(epicId);

    expect(result).toEqual(mockEpicAssign);
  });
});

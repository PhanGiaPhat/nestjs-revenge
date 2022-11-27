import { TasksService } from './tasks.service';
import { Repository } from 'typeorm';
import { TaskEntity } from './entities/task.entity';
import { createMock } from '@golevelup/ts-jest';
import { EpicEntity } from '../epics/entities/epic.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';

describe('Task Service', () => {
  const mockReturn = { id: 1 };

  let tasksService: TasksService;

  const taskRepo = createMock<Repository<TaskEntity>>({
    find: jest.fn().mockReturnValue([mockReturn]),
    findOne: jest.fn().mockReturnValue(mockReturn),
    save: jest.fn().mockReturnValue(mockReturn),
    delete: jest.fn(),
  });

  const epicRepo = createMock<Repository<EpicEntity>>({
    find: jest.fn().mockReturnValue([mockReturn]),
    findOne: jest.fn().mockReturnValue(mockReturn),
    save: jest.fn().mockReturnValue(mockReturn),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(TaskEntity),
          useValue: taskRepo,
        },
        {
          provide: getRepositoryToken(EpicEntity),
          useValue: epicRepo,
        },
      ],
    }).compile();

    tasksService = moduleRef.get<TasksService>(TasksService);
  });

  afterEach(jest.clearAllMocks);

  it('Create task function should work well', async () => {
    const task: CreateTaskDto = {
      name: 'name',
      description: 'desc',
      parentTask: null,
      childTasks: [],
    };

    const result = await tasksService.create(task);

    expect(taskRepo.save).toBeCalledTimes(1);
    expect(taskRepo.save).toBeCalledWith(task);

    expect(result).toEqual(mockReturn);
  });

  it('findAll task function should work well', async () => {
    const result = await tasksService.findAll();

    expect(taskRepo.find).toBeCalledTimes(1);

    expect(result).toEqual([mockReturn]);
  });

  it('findOne task function should work well', async () => {
    const id = 'id';

    const result = await tasksService.findOne(id);

    expect(taskRepo.findOne).toBeCalledTimes(1);
    expect(taskRepo.findOne).toBeCalledWith({
      where: { id: id },
      relations: {
        epic: true,
        parentTask: true,
        childTasks: true,
      },
    });

    expect(result).toEqual(mockReturn);
  });

  it('Update task function should work well', async () => {
    const id = 'id';
    const task: CreateTaskDto = {
      name: 'name',
      description: 'desc',
      parentTask: null,
      childTasks: [],
    };

    const result = await tasksService.update(id, task);

    expect(taskRepo.save).toBeCalledTimes(1);
    expect(taskRepo.save).toBeCalledWith({ id: id, updateTaskDto: task });

    expect(result).toEqual(mockReturn);
  });

  it('Remove task function should work well', async () => {
    const id = 'id';
    const result = await tasksService.remove(id);

    expect(taskRepo.delete).toBeCalledTimes(1);
    expect(taskRepo.delete).toBeCalledWith({ id: id });
  });

  it('Link epic function should work well', async () => {
    const taskId = 'taskId';
    const epicId = 'epicId';

    const result = await tasksService.link(taskId, epicId);

    expect(taskRepo.findOne).toBeCalledTimes(1);
    expect(taskRepo.findOne).toBeCalledWith({ where: { id: taskId } });

    expect(epicRepo.findOne).toBeCalledTimes(1);
    expect(epicRepo.findOne).toBeCalledWith({ where: { id: epicId } });

    expect(taskRepo.save).toBeCalledTimes(1);

    expect(result).toEqual(mockReturn);
  });

  it('Unlink epic function should work well', async () => {
    const taskId = 'taskId';

    const result = await tasksService.unLink(taskId);

    expect(taskRepo.findOne).toBeCalledTimes(1);
    expect(taskRepo.findOne).toBeCalledWith({ where: { id: taskId } });

    expect(taskRepo.save).toBeCalledTimes(1);

    expect(result).toEqual(mockReturn);
  });
});

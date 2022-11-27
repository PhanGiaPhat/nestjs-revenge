import { Test } from '@nestjs/testing';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('Task Controller', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  const mockReturn: CreateTaskDto = {
    name: 'name',
    description: 'desc',
    parentTask: null,
    childTasks: [],
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TasksController,
        {
          provide: TasksService,
          useValue: {
            create: jest.fn().mockReturnValueOnce(mockReturn),
            findAll: jest.fn().mockReturnValueOnce([mockReturn]),
            findOne: jest.fn().mockReturnValueOnce(mockReturn),
            update: jest.fn().mockReturnValueOnce(mockReturn),
            remove: jest.fn().mockReturnValueOnce(mockReturn),
            link: jest.fn().mockResolvedValueOnce(mockReturn),
            unLink: jest.fn().mockResolvedValueOnce(mockReturn),
          },
        },
      ],
    }).compile();

    tasksController = moduleRef.get<TasksController>(TasksController);
    tasksService = moduleRef.get<TasksService>(TasksService);
  });

  afterEach(jest.clearAllMocks);

  it('findAll task function should work well', async () => {
    const result = await tasksController.findAll();

    expect(tasksService.findAll).toBeCalledTimes(1);

    expect(result).toEqual([mockReturn]);
  });

  it('findOne task function should work well', async () => {
    const id = 'id';
    const result = await tasksController.findOne(id);

    expect(tasksService.findOne).toBeCalledTimes(1);
    expect(tasksService.findOne).toBeCalledWith(id);

    expect(result).toEqual(mockReturn);
  });

  it('Remove task function should work well', async () => {
    const id = 'id';
    const result = await tasksController.remove(id);

    expect(tasksService.remove).toBeCalledTimes(1);
    expect(tasksService.remove).toBeCalledWith(id);
  });

  it('Link epic function should work well', async () => {
    const taskId = 'taskId';
    const epicId = 'epicId';

    const result = await tasksController.link(taskId, epicId);

    expect(tasksService.link).toBeCalledTimes(1);
    expect(tasksService.link).toBeCalledWith(taskId, epicId);

    expect(result).toEqual(mockReturn);
  });

  it('Unlink epic function should work well', async () => {
    const taskId = 'taskId';

    const result = await tasksController.unLink(taskId);

    expect(tasksService.unLink).toBeCalledTimes(1);
    expect(tasksService.unLink).toBeCalledWith(taskId);

    expect(result).toEqual(mockReturn);
  });

  it('Update task function should work well', async () => {
    const taskId = 'taskId';
    const task: CreateTaskDto = {
      name: 'name',
      description: 'desc',
      parentTask: null,
      childTasks: [],
    };

    const result = await tasksController.update(taskId, task);

    expect(tasksService.update).toBeCalledTimes(1);
    expect(tasksService.update).toBeCalledWith(taskId, task);

    expect(result).toEqual(mockReturn);
  });

  it('Create task function should work well', async () => {
    const task: CreateTaskDto = {
      name: 'name',
      description: 'desc',
      parentTask: null,
      childTasks: [],
    };

    const result = await tasksController.create(task);

    expect(tasksService.create).toBeCalledTimes(1);
    expect(tasksService.create).toBeCalledWith(task);

    expect(result).toEqual(mockReturn);
  });
});

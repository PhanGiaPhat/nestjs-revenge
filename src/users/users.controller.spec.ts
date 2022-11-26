import { Test } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('Users Controller', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const mockUserId = '1';
  const mockUserArrs = [
    {
      id: '1',
      name: 'name 1',
    },
    {
      id: '2',
      name: 'name 2',
    },
  ];
  const mockUser = {
    id: 'id',
    name: 'name',
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValueOnce({
              id: mockUserId,
            }),
            findAll: jest.fn().mockResolvedValueOnce(mockUserArrs),
            findOne: jest.fn().mockResolvedValueOnce(mockUser),
            update: jest.fn().mockResolvedValueOnce({
              id: mockUserId,
            }),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
  });

  afterEach(jest.clearAllMocks);

  it('create user function should work well', async () => {
    const mockCreateUserDto: CreateUserDto = {
      name: 'test 1',
    };

    const result = await usersController.create(mockCreateUserDto);

    expect(usersService.create).toHaveBeenCalledTimes(1);

    expect(usersService.create).toHaveBeenCalledWith(mockCreateUserDto);

    expect(result).toEqual({
      id: mockUserId,
    });
  });

  it('findAll user function should work well', async () => {
    const result = await usersController.findAll();

    expect(usersService.findAll).toBeCalledTimes(1);

    expect(result).toEqual(mockUserArrs);
  });

  it('findOne user function should work well', async () => {
    const id = '1';

    const result = await usersController.findOne(id);

    expect(usersService.findOne).toBeCalledTimes(1);

    expect(usersService.findOne).toBeCalledWith(id);

    expect(result).toEqual(mockUser);
  });
  it('update user function should work well', async () => {
    const id = '1';

    const userUpdate: CreateUserDto = {
      name: 'name',
    };

    const result = await usersController.update(id, userUpdate);

    expect(usersService.update).toBeCalledTimes(1);

    expect(usersService.update).toBeCalledWith(id, userUpdate);

    expect(result).toEqual({
      id: mockUserId,
    });
  });
  it('remove user function should work well', async () => {
    const id = '1';

    await usersController.remove(id);

    expect(usersService.remove).toBeCalledTimes(1);
  });
});

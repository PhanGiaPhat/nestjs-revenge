import { Test } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('Users Controller', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const mockUserId = '1';

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
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
  });

  afterEach(jest.clearAllMocks);

  it.only('create user function should work well', async () => {
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
  it('findAll user function should work well', async () => {});
  it('findOne user function should work well', async () => {});
  it('update user function should work well', async () => {});
  it('remove user function should work well', async () => {});
});

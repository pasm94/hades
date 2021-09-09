import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { User } from '../entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockUsersRepository = {
    findOne: jest.fn(),
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((user) =>
        Promise.resolve({ id: Date.now(), ...user }),
      ),
    find: jest.fn().mockImplementation(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to create a new user', async () => {
    const user = {
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    };

    const savedUser = await service.create(user);

    const passwordMatch = await compare(user.password, savedUser.password);

    expect(passwordMatch).toEqual(true);
  });

  it('should not be able to create a new user with an already used email', async () => {
    const user = {
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    };
    const user2 = {
      name: 'John Doe 2',
      email: 'johndoe@test.com',
      password: '123456',
    };

    const savedUser = await service.create(user);

    const savedUser2 = await service.create(user2);

    const users = await service.findAll();
    // const passwordMatch = await compare(user.password, savedUser.password);
    console.log(users);

    // expect(passwordMatch).toEqual(true);
  });
});

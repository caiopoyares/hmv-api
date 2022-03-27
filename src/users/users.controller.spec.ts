import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from '../enums/roles.enum';
import { Repository } from 'typeorm';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';

const usersMock: User[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    type: Role.Patient,
    cpf: '42113278845',
    age: 30,
    email: 'john.doe@gmail.com',
    password: 'mockPassword',
    emergencyInfo: [],
    emergencyOrders: [],
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Doe',
    type: Role.Patient,
    cpf: '42113278832',
    age: 22,
    email: 'jane@gmail.com',
    password: 'mockPassword',
    emergencyInfo: [],
    emergencyOrders: [],
  },
] as User[];

describe('UsersController', () => {
  let userController: UsersController;
  let userService: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    userService = module.get<UsersService>(UsersService);
    userController = new UsersController(userService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should get specific user', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(usersMock[0]);

    const result = await userController.getUser('1');
    expect(result).toEqual(usersMock[0]);
  });

  it('should get all users', async () => {
    jest.spyOn(userRepository, 'find').mockResolvedValueOnce(usersMock);

    const result = await userController.getUsers();
    expect(result).toEqual(usersMock);
  });

  it('should delete user', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(usersMock[0]);
    jest.spyOn(userRepository, 'delete').mockResolvedValueOnce(null);

    await userController.deleteUser('1');

    expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    expect(userRepository.delete).toHaveBeenCalledWith(
      usersMock[0].id.toString(),
    );
  });

  it('should add user', async () => {
    const newUser: User = {
      id: 3,
      firstName: 'New',
      lastName: 'User',
      type: Role.Patient,
      cpf: '12113278848',
      age: 55,
      email: 'new.user@gmail.com',
      password: 'mockPassword',
      emergencyInfo: [],
      emergencyOrders: [],
    };

    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);
    jest.spyOn(userRepository, 'save').mockResolvedValueOnce(newUser);

    await userController.addUser(newUser);

    expect(userRepository.save).toHaveBeenCalledTimes(1);
    expect(userRepository.save).toHaveBeenCalledWith(newUser);
  });
});

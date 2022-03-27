import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmergencyInfo } from './emergency-info.entity';
import { EmergencyInfoController } from './emergency-info.controller';
import { EmergencyInfoService } from './emergency-info.service';
import { User } from '../users/users.entity';
import { CreateEmergencyInfoDto } from './emergency-info.dto';
import { Role } from '../enums/roles.enum';

const emergencyInfosMock: EmergencyInfo[] = [
  {
    id: 1,
    allergies: '',
    regularDrugs: '',
    chronicDiseases: '',
    user: {} as User,
  },
  {
    id: 2,
    allergies: '',
    regularDrugs: '',
    chronicDiseases: '',
    user: {} as User,
  },
] as EmergencyInfo[];

const mockUser = {
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
};

describe('EmergencyInfoController', () => {
  let emergencyInfoController: EmergencyInfoController;
  let emergencyInfoService: EmergencyInfoService;
  let emergencyInfoRepository: Repository<EmergencyInfo>;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmergencyInfoService,
        {
          provide: getRepositoryToken(EmergencyInfo),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    emergencyInfoRepository = module.get<Repository<EmergencyInfo>>(
      getRepositoryToken(EmergencyInfo),
    );
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
    emergencyInfoService =
      module.get<EmergencyInfoService>(EmergencyInfoService);
    emergencyInfoController = new EmergencyInfoController(emergencyInfoService);
  });

  it('should be defined', () => {
    expect(emergencyInfoService).toBeDefined();
  });

  it('should get specific emergencyInfo', async () => {
    jest
      .spyOn(emergencyInfoRepository, 'findOne')
      .mockResolvedValueOnce(emergencyInfosMock[0]);

    const result = await emergencyInfoController.getEmergencyInfo('1');
    expect(result).toEqual(emergencyInfosMock[0]);
  });

  it('should get all emergency infos', async () => {
    jest
      .spyOn(emergencyInfoRepository, 'find')
      .mockResolvedValueOnce(emergencyInfosMock);

    const result = await emergencyInfoController.getEmergenciesInfo();
    expect(result).toEqual(emergencyInfosMock);
  });

  it('should delete emergency info', async () => {
    jest
      .spyOn(emergencyInfoRepository, 'findOne')
      .mockResolvedValueOnce(emergencyInfosMock[0]);
    jest.spyOn(emergencyInfoRepository, 'delete').mockResolvedValueOnce(null);

    await emergencyInfoController.deleteEmergencyInfo('1');

    expect(emergencyInfoRepository.findOne).toHaveBeenCalledTimes(1);
    expect(emergencyInfoRepository.delete).toHaveBeenCalledWith(
      emergencyInfosMock[0].id.toString(),
    );
  });

  it('should add emergency info', async () => {
    const newEmergencyInfo = {
      allergies: '',
      regularDrugs: '',
      chronicDiseases: '',
      user: {} as User,
      userId: 1,
    } as CreateEmergencyInfoDto;

    jest.spyOn(emergencyInfoRepository, 'findOne').mockResolvedValueOnce(null);
    jest.spyOn(usersRepository, 'findOne').mockResolvedValueOnce(mockUser);
    jest
      .spyOn(emergencyInfoRepository, 'save')
      .mockResolvedValueOnce({ id: 1, ...newEmergencyInfo });

    await emergencyInfoController.addEmergencyInfo(newEmergencyInfo);

    expect(emergencyInfoRepository.save).toHaveBeenCalledTimes(1);
    expect(emergencyInfoRepository.save).toHaveBeenCalledWith(newEmergencyInfo);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hospital } from './hospital.entity';
import { HospitalController } from './hospital.controller';
import { HospitalService } from './hospital.service';

const hospitalsMock: Hospital[] = [
  {
    id: 1,
    name: 'Unidade Iguatemi',
    address: 'Av. Antônio Carlos Berta, Shopping Iguatemi',
    telephone: '5133143434',
  },
  {
    id: 2,
    name: 'Unidade Canoas',
    address: 'Av. Getúlio Vargas 4831, Canoas',
    telephone: '5133143434',
  },
] as Hospital[];

describe('HospitalController', () => {
  let hospitalController: HospitalController;
  let hospitalService: HospitalService;
  let hospitalRepository: Repository<Hospital>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HospitalService,
        {
          provide: getRepositoryToken(Hospital),
          useClass: Repository,
        },
      ],
    }).compile();

    hospitalRepository = module.get<Repository<Hospital>>(
      getRepositoryToken(Hospital),
    );
    hospitalService = module.get<HospitalService>(HospitalService);
    hospitalController = new HospitalController(hospitalService);
  });

  it('should be defined', () => {
    expect(hospitalService).toBeDefined();
  });

  it('should get specific hospital', async () => {
    jest
      .spyOn(hospitalRepository, 'findOne')
      .mockResolvedValueOnce(hospitalsMock[0]);

    const result = await hospitalController.getHospital('1');
    expect(result).toEqual(hospitalsMock[0]);
  });

  it('should get all hospitals', async () => {
    jest.spyOn(hospitalRepository, 'find').mockResolvedValueOnce(hospitalsMock);

    const result = await hospitalController.getHospitals();
    expect(result).toEqual(hospitalsMock);
  });

  it('should delete hospital', async () => {
    jest
      .spyOn(hospitalRepository, 'findOne')
      .mockResolvedValueOnce(hospitalsMock[0]);
    jest.spyOn(hospitalRepository, 'delete').mockResolvedValueOnce(null);

    await hospitalController.deleteUser('1');

    expect(hospitalRepository.findOne).toHaveBeenCalledTimes(1);
    expect(hospitalRepository.delete).toHaveBeenCalledWith(
      hospitalsMock[0].id.toString(),
    );
  });

  it('should add hospital', async () => {
    const newHospital: Hospital = {
      id: 3,
      name: 'Unidade Nova',
      address: 'Av. Antônio Carlos Berta',
      telephone: '5133143434',
    } as Hospital;

    jest.spyOn(hospitalRepository, 'findOne').mockResolvedValueOnce(null);
    jest.spyOn(hospitalRepository, 'save').mockResolvedValueOnce(newHospital);

    await hospitalController.addHospital(newHospital);

    expect(hospitalRepository.save).toHaveBeenCalledTimes(1);
    expect(hospitalRepository.save).toHaveBeenCalledWith(newHospital);
  });
});

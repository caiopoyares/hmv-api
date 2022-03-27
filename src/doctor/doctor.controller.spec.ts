import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';

const doctorsMock: Doctor[] = [
  {
    id: 1,
    crm: 21254412,
    firstName: 'John',
    lastName: 'Doe',
    area: 'Cardiologia',
    speciality: 'Cardiologista',
    phone: '11987894141',
  },
  {
    id: 2,
    crm: 11254416,
    firstName: 'Jane',
    lastName: 'Doe',
    area: 'Cardiologia',
    speciality: 'Cardiologista',
    phone: '11987894141',
  },
] as Doctor[];

describe('DoctorController', () => {
  let doctorController: DoctorController;
  let doctorService: DoctorService;
  let doctorRepository: Repository<Doctor>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorService,
        {
          provide: getRepositoryToken(Doctor),
          useClass: Repository,
        },
      ],
    }).compile();

    doctorRepository = module.get<Repository<Doctor>>(
      getRepositoryToken(Doctor),
    );
    doctorService = module.get<DoctorService>(DoctorService);
    doctorController = new DoctorController(doctorService);
  });

  it('should be defined', () => {
    expect(doctorService).toBeDefined();
  });

  it('should get specific doctor', async () => {
    jest
      .spyOn(doctorRepository, 'findOne')
      .mockResolvedValueOnce(doctorsMock[0]);

    const result = await doctorController.getDoctor('1');
    expect(result).toEqual(doctorsMock[0]);
  });

  it('should get all doctors', async () => {
    jest.spyOn(doctorRepository, 'find').mockResolvedValueOnce(doctorsMock);

    const result = await doctorController.getDoctors();
    expect(result).toEqual(doctorsMock);
  });

  it('should delete doctor', async () => {
    jest
      .spyOn(doctorRepository, 'findOne')
      .mockResolvedValueOnce(doctorsMock[0]);
    jest.spyOn(doctorRepository, 'delete').mockResolvedValueOnce(null);

    await doctorController.deleteUser('1');

    expect(doctorRepository.findOne).toHaveBeenCalledTimes(1);
    expect(doctorRepository.delete).toHaveBeenCalledWith(
      doctorsMock[0].id.toString(),
    );
  });

  it('should add doctor', async () => {
    const newDoctor: Doctor = {
      id: 4,
      crm: 21254410,
      firstName: 'John',
      lastName: 'Doe',
      area: 'Cardiologia',
      speciality: 'Cardiologista',
      phone: '11987894141',
    } as Doctor;

    jest.spyOn(doctorRepository, 'findOne').mockResolvedValueOnce(null);
    jest.spyOn(doctorRepository, 'save').mockResolvedValueOnce(newDoctor);

    await doctorController.addDoctor(newDoctor);

    expect(doctorRepository.save).toHaveBeenCalledTimes(1);
    expect(doctorRepository.save).toHaveBeenCalledWith(newDoctor);
  });
});

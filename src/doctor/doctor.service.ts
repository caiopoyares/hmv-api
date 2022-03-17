import {
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { CreateDoctorDto } from './doctor.dto';
  import { Doctor } from './doctor.entity';
  
  @Injectable()
  export class DoctorService {
    constructor(
      @InjectRepository(Doctor) private doctorRepository: Repository<Doctor>,
    ) {}
  
    async findOne(id: string): Promise<Doctor> {
      const doctor = await this.doctorRepository.findOne(id);
  
      if (!doctor)
        throw new NotFoundException(`A doctor with id of ${id} hasn't been found.`);
  
      return doctor;
    }
  
    async findAll(): Promise<Doctor[]> {
      return this.doctorRepository.find();
    }
  
    async add(doctorDto: CreateDoctorDto): Promise<Doctor> {
        return await this.doctorRepository.save(doctorDto);
    }

    async update(id: string, createDoctorDto: CreateDoctorDto): Promise<Doctor> {
      const doctor = await this.doctorRepository.findOne(id);

      if (!doctor) throw new NotFoundException();

      doctor.name = createDoctorDto.name;
      doctor.area = createDoctorDto.area;
      doctor.speciality = createDoctorDto.speciality;
      doctor.phone = createDoctorDto.phone;

      await this.doctorRepository.update(id, doctor);

      return doctor;
    }
  
    async remove(id: string): Promise<void> {
      const doctor = await this.doctorRepository.findOne(id);
      
      if (!doctor) throw new NotFoundException();
  
      await this.doctorRepository.delete(id);
    }
  }
  
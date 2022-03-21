import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHospitalDto, UpdateHospitalDto } from './hospital.dto';
import { Hospital } from './hospital.entity';

@Injectable()
export class HospitalService {
  constructor(
    @InjectRepository(Hospital)
    private hospitalRepository: Repository<Hospital>,
  ) {}

  async findOne(id: string): Promise<Hospital> {
    const hospital = await this.hospitalRepository.findOne(id);

    if (!hospital)
      throw new NotFoundException(
        `A hospital with id of ${id} hasn't been found.`,
      );

    return hospital;
  }

  async findAll(): Promise<Hospital[]> {
    return this.hospitalRepository.find();
  }

  async add(hospitalDto: CreateHospitalDto): Promise<Hospital> {
    return this.hospitalRepository.save(hospitalDto);
  }

  async update(id: string, hospitalDto: UpdateHospitalDto): Promise<Hospital> {
    const hospital = await this.hospitalRepository.findOne(id);

    if (!hospital) throw new NotFoundException();

    await this.hospitalRepository.update(id, hospitalDto);

    return { ...hospital, ...hospitalDto };
  }

  async remove(id: string): Promise<void> {
    const hospital = await this.hospitalRepository.findOne(id);

    if (!hospital) throw new NotFoundException();

    await this.hospitalRepository.delete(id);
  }
}

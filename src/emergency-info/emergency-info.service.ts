import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { Repository } from 'typeorm';
import { CreateEmergencyInfoDto } from './emergency-info.dto';
import { EmergencyInfo } from './emergency-info.entity';

@Injectable()
export class EmergencyInfoService {
  constructor(
    @InjectRepository(EmergencyInfo)
    private emergencyInfoRepository: Repository<EmergencyInfo>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<EmergencyInfo> {
    const emergencyInfo = await this.emergencyInfoRepository.findOne(id);

    if (!emergencyInfo)
      throw new NotFoundException(
        `An emergency info with id of ${id} hasn't been found.`,
      );

    return emergencyInfo;
  }

  async findAll(): Promise<EmergencyInfo[]> {
    return this.emergencyInfoRepository.find({ relations: ['user'] });
  }

  async add(
    createEmergencyInfoDto: CreateEmergencyInfoDto,
  ): Promise<EmergencyInfo> {
    const user = await this.userRepository.findOne(
      createEmergencyInfoDto.userId,
    );

    if (!user) {
      throw new NotFoundException(
        `A user with id of ${createEmergencyInfoDto.userId} hasn't been found.`,
      );
    }

    createEmergencyInfoDto.user = user;

    return this.emergencyInfoRepository.save(createEmergencyInfoDto);
  }

  async remove(id: string): Promise<void> {
    const emergencyInfo = await this.emergencyInfoRepository.findOne(id);

    if (!emergencyInfo) throw new NotFoundException();

    await this.emergencyInfoRepository.delete(id);
  }
}

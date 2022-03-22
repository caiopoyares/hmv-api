import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmergencyOrderDto } from './emergency-order.dto';
import { EmergencyOrder } from './emergency-order.entity';
import { User } from '../users/users.entity';

@Injectable()
export class EmergencyOrderService {
  constructor(
    @InjectRepository(EmergencyOrder)
    private emergencyOrderRepository: Repository<EmergencyOrder>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<EmergencyOrder> {
    const emergencyOrder = await this.emergencyOrderRepository.findOne(id);

    if (!emergencyOrder)
      throw new NotFoundException(
        `A emergency order with id of ${id} hasn't been found.`,
      );

    return emergencyOrder;
  }

  async findAll(): Promise<EmergencyOrder[]> {
    return this.emergencyOrderRepository.find();
  }

  //   async createEmergencyOrder(
  //     emergencyOrderDto: CreateEmergencyOrderDto,
  //   ): Promise<EmergencyOrder> {
  //     const user = await this.userRepository.findOne({
  //       where: { cpf: emergencyOrderDto.pacientCPF },
  //     });

  //     if (!user) {
  //       // create new user
  //     }

  //     return this.emergencyOrderRepository.save(emergencyOrderDto);
  //   }
}

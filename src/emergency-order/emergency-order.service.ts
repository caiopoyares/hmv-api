import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmergencyOrderDto } from './emergency-order.dto';
import { EmergencyOrder } from './emergency-order.entity';
import { User } from '../users/users.entity';
import { Role } from 'src/enums/roles.enum';
import { Hospital } from 'src/hospital/hospital.entity';
import { UsersService } from 'src/users/users.service';
import { generateRandomPassword } from 'src/helpers';
import { EmergencyOrderStatus } from 'src/enums/emergency-order-status.enum';

@Injectable()
export class EmergencyOrderService {
  constructor(
    @InjectRepository(EmergencyOrder)
    private emergencyOrderRepository: Repository<EmergencyOrder>,
    private userService: UsersService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Hospital)
    private hospitalRepository: Repository<Hospital>,
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

  async createEmergencyOrder(
    emergencyOrderDto: CreateEmergencyOrderDto,
  ): Promise<EmergencyOrder> {
    const {
      patientFirstName,
      patientLastName,
      patientCPF,
      patientEmail,
      arrivalDate,
      arrivalTime,
      hospitalId,
      reason,
      description,
    } = emergencyOrderDto;

    let user = await this.userRepository.findOne({
      where: { cpf: patientCPF },
    });

    if (!user) {
      const password = generateRandomPassword(10);
      const newUserDto = {
        firstName: patientFirstName,
        lastName: patientLastName,
        cpf: patientCPF,
        email: patientEmail,
        type: Role.Patient,
        password,
      };
      const userData = await this.userRepository.save(newUserDto);
      user = { ...userData, password };
    }
    const hospital = await this.hospitalRepository.findOne(hospitalId);

    return this.emergencyOrderRepository.save({
      status: EmergencyOrderStatus.Open,
      user,
      hospital,
      arrivalDate,
      arrivalTime,
      reason,
      description,
    });
  }
}

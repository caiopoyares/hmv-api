import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmergencyOrderDto, FinishEmergencyOrderDto } from './dtos';
import { EmergencyOrder } from './emergency-order.entity';
import { User } from '../users/users.entity';
import { Role } from '../enums/roles.enum';
import { Hospital } from '../hospital/hospital.entity';
import { generateRandomPassword } from '../helpers';
import { EmergencyOrderStatus } from '../enums/emergency-order-status.enum';
import { Doctor } from '../doctor/doctor.entity';

@Injectable()
export class EmergencyOrderService {
  constructor(
    @InjectRepository(EmergencyOrder)
    private emergencyOrderRepository: Repository<EmergencyOrder>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Hospital)
    private hospitalRepository: Repository<Hospital>,
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  async findAll(): Promise<EmergencyOrder[]> {
    return this.emergencyOrderRepository.find({
      relations: ['user', 'hospital', 'doctor'],
    });
  }

  async findOne(id: string): Promise<EmergencyOrder> {
    const emergencyOrder = await this.emergencyOrderRepository.findOne(id, {
      relations: ['user', 'hospital', 'doctor'],
    });

    if (!emergencyOrder)
      throw new NotFoundException(
        `A emergency order with id of ${id} hasn't been found.`,
      );

    return emergencyOrder;
  }

  async findOpened(): Promise<EmergencyOrder[]> {
    return this.emergencyOrderRepository.find({
      where: { status: EmergencyOrderStatus.Open },
    });
  }

  async findClosed(): Promise<EmergencyOrder[]> {
    return this.emergencyOrderRepository.find({
      where: { status: EmergencyOrderStatus.Complete },
    });
  }

  async createEmergencyOrder(
    dto: CreateEmergencyOrderDto,
  ): Promise<EmergencyOrder> {
    const {
      patientFirstName,
      patientLastName,
      patientCPF,
      patientEmail,
      patientAge,
      arrivalDate,
      hospitalId,
      reason,
      description,
    } = dto;

    let user = await this.userRepository.findOne({
      where: { cpf: patientCPF, type: Role.Patient },
    });

    if (!user) {
      const password = generateRandomPassword(10);
      const newUserDto = {
        firstName: patientFirstName,
        lastName: patientLastName,
        cpf: patientCPF,
        email: patientEmail,
        age: parseInt(patientAge),
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
      reason,
      description,
    });
  }

  async finishEmergencyOrder(orderId: string, dto: FinishEmergencyOrderDto) {
    const { doctorId, finishDate, suggestions, weeksUntilReturn } = dto;

    const emergencyOrder = await this.emergencyOrderRepository.findOne(orderId);

    if (!emergencyOrder)
      throw new NotFoundException(
        `An emergency order with id of ${orderId} hasn't been found.`,
      );

    const doctor = await this.doctorRepository.findOne(doctorId);

    const updatedOrder = {
      ...emergencyOrder,
      doctor,
      weeksUntilReturn: parseInt(weeksUntilReturn),
      suggestions,
      finishDate,
      status: EmergencyOrderStatus.Complete,
    };

    return this.emergencyOrderRepository.save(updatedOrder);
  }
}

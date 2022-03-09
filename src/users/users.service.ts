import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './users.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findByCpf(cpf: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { cpf },
      select: ['id', 'firstName', 'lastName', 'cpf', 'password'],
    });
  }

  async add(userDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(userDto);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

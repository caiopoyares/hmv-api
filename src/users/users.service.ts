import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const user = await this.usersRepository.findOne(id);

    if (!user)
      throw new NotFoundException(`A user with id of ${id} hasn't been found.`);

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findByCpf(cpf: string): Promise<User> {
    const user = this.usersRepository.findOne({
      where: { cpf },
      select: ['id', 'firstName', 'lastName', 'cpf', 'type', 'password'],
    });

    if (!user) {
      throw new NotFoundException(
        `A user with cpf of ${cpf} hasn't been found.`,
      );
    }

    return user;
  }

  async add(userDto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: [{ email: userDto.email }, { cpf: userDto.cpf }],
    });

    if (user) throw new BadRequestException('User cpf or email already exists');

    return this.usersRepository.save(userDto);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

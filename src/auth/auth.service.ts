import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.entity';
import * as bcrypt from 'bcrypt';
import { Role } from '../enums/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    userCpf: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findByCpf(userCpf);
    const isMatch = await bcrypt.compare(password, user.password);
    const isAttendant = user.type === Role.Attendant;
    if (user && isMatch && isAttendant) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: pass, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Omit<User, 'password'>) {
    const payload = {
      username: user.firstName,
      type: user.type,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

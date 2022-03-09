import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'cpf',
      passwordField: 'password',
    });
  }

  async validate(userCpf: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(userCpf, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';

import { UsersDbService } from 'src/users/usersDb.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersDbService: UsersDbService) {}
  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    if (!email || !password) {
      throw new UnauthorizedException('Email or password not provided');
    }
    const user = await this.usersDbService.findOneByEmail(email);

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    return { message: 'Sign in successful' };
  }
}

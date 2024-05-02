import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { UsersDbService } from 'src/users/usersDb.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcript from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

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

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcript.hash(createUserDto.password, 10);
    if (!hashedPassword) {
      throw new BadRequestException('Error hashing password');
    }
    createUserDto.password = hashedPassword;
    return await this.usersDbService.create(createUserDto);
  }
}

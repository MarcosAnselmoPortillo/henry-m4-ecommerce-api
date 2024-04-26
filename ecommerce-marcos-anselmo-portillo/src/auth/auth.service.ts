import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SigninDto } from './dto/signin.dto';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    if (!email || !password) {
      throw new UnauthorizedException('Email or password not provided');
    }
    const user = await this.usersRepository.findOneByEmail(email);

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    return { message: 'Sign in successful' };
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { UsersDbService } from 'src/users/usersDb.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcript from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Role } from './roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersDbService: UsersDbService,
    private readonly JwtService: JwtService,
  ) {}
  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.usersDbService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    const isPasswordValid = await bcript.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      identity: user.id,
      roles: [user.isAdmin ? Role.ADMIN : Role.USER],
    };
    const access_token = this.JwtService.sign(payload);
    return {
      success: 'User logged in successfully',
      access_token,
    };
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

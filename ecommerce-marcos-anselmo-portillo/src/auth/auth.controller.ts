import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    if (createUserDto.confirmPassword) {
      if (createUserDto.password !== createUserDto.confirmPassword) {
        throw new BadRequestException('Passwords do not match');
      }
    }

    const user = await this.authService.signUp(createUserDto);
    const { password, isAdmin, ...userWithoutPasswordAndAdmin } = user;
    return userWithoutPasswordAndAdmin;
  }
}

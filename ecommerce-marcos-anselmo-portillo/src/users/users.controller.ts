import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  Query,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UsersDbService } from './usersDb.service';
import { User } from './entities/user.entity';
import { BadRequestException } from '@nestjs/common';
import { validate as isValidUuid } from 'uuid';

@Controller('users')
export class UsersController {
  constructor(private readonly usersDbService: UsersDbService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const userId = await this.usersDbService.create(createUserDto);
      return {
        statusCode: 201,
        message: 'User created successfully',
        userId: userId,
      };
    } catch (error) {
      if (error.status === 400) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('Error creating user');
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ): Promise<Omit<User, 'password'>[]> {
    return this.usersDbService.findAll(+page, +limit);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Omit<User, 'password'>> {
    if (!isValidUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const user = this.usersDbService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    console.log(id, updateUserDto);
    
    if (!isValidUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    if (!updateUserDto || Object.keys(updateUserDto).length === 0) {
      throw new BadRequestException(`Missing update user data`);
    }
    
    try {
      const user = await this.usersDbService.update(id, updateUserDto);
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return {
        statusCode: 200,
        message: 'User updated successfully',
        userId: id,
      };
      
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('Error updating user');
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!isValidUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const user = this.usersDbService.remove(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return {
      statusCode: 200,
      message: 'User deleted successfully',
      userId: id,
    };
  }
}

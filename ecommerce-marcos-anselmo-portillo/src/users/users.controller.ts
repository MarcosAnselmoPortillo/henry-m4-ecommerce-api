import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  Query,
  UseGuards,
  InternalServerErrorException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UsersDbService } from './usersDb.service';
import { User } from './entities/user.entity';
import { BadRequestException } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersDbService: UsersDbService) {}

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ): Promise<Omit<User, 'password'>[]> {
    return this.usersDbService.findAll(+page, +limit);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Omit<User, 'password' | 'isAdmin'>> {
    const user = this.usersDbService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
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
  remove(@Param('id', ParseUUIDPipe) id: string) {
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

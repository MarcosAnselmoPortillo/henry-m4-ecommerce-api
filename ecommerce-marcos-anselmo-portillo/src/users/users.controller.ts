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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  omitPassword(user: User): Omit<User, 'password'> {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const userId = this.usersService.create(createUserDto);
    return {
      statusCode: 201,
      message: 'User created successfully',
      userId: userId,
    };
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ): Omit<User, 'password'>[] {
    const users = this.usersService.findAll(+page, +limit);
    return users.map((user) => this.omitPassword(user));
  }

  @Get(':id')
  findOne(@Param('id') id: string): Omit<User, 'password'> {
    const user = this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.omitPassword(this.usersService.findOne(+id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = this.usersService.update(+id, updateUserDto);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return {
      statusCode: 200,
      message: 'User updated successfully',
      userId: id,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const user = this.usersService.remove(+id);
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

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './users.interface';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  private omitPassword(user: User): Omit<User, 'password'> {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  findAll(page: number, limit: number): Omit<User, 'password'>[] {
    const users = this.usersRepository.findAll(page, limit);
    return users.map((user) => this.omitPassword(user));
  }

  findOne(id: number): Omit<User, 'password'> {
    const user = this.usersRepository.findOne(id);
    return this.omitPassword(user);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.remove(id);
  }
}

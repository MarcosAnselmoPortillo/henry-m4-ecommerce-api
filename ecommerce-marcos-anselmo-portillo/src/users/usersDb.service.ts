import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersDbService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  private omitPassword(user: User): Omit<User, 'password'> {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  async findAll(
    page: number,
    limit: number,
  ): Promise<Omit<User, 'password'>[]> {
    const users = await this.usersRepository.find();
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    if (startIndex >= users.length) {
      return [];
    }
    return users
      .slice(startIndex, endIndex)
      .map((user) => this.omitPassword(user));
  }

  async findOne(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.omitPassword(user);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExists = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (userExists) {
      throw new BadRequestException(
        `User with email ${createUserDto.email} already exists`,
      );
    }

    const user = new User();
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.password = createUserDto.password;
    user.phone = createUserDto.phone;
    user.country = createUserDto.country;
    user.address = createUserDto.address;
    user.city = createUserDto.city;

    const newUser = await this.usersRepository.save(user);
    return newUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    Object.assign(user, updateUserDto);
    return await this.usersRepository.save(user);
  }

  async remove(id: string) {
    return await this.usersRepository.delete({ id });
  }
}

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
import { User, UserResponse } from './entities/user.entity';
import { BadRequestException } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersDbService: UsersDbService) {}

  @ApiResponse({
    status: 200,
    description: 'Find all users successfully',
    type: [UserResponse],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ): Promise<Omit<User, 'password'>[]> {
    return this.usersDbService.findAll(+page, +limit);
  }

  @ApiResponse({
    status: 200,
    description: 'Find user successfully',
    type: UserResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Error finding user' })
  @ApiBearerAuth()
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

  @ApiResponse({
    status: 200,
    description: 'Update user successfully',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Error updating user' })
  @ApiBearerAuth()
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

  @ApiResponse({
    status: 200,
    description: 'Delete user successfully',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Error deleting user' })
  @ApiBearerAuth()
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

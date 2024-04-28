import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersDbService } from './usersDb.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersDbService],
})
export class UsersModule {}

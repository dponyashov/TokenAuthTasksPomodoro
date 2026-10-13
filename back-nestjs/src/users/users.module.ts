import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordHasher } from '@nestjs/authentication';
import { UserEntity, UserProfileEntity } from './entities/index.js';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserProfileEntity])],
  providers: [UsersService, PasswordHasher],
  exports: [UsersService],
})
export class UsersModule {}

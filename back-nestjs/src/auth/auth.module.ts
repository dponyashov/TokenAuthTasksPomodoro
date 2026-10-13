import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UsersModule } from '../users/users.module.js';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { RtStrategy } from './strategies/rt.strategy.js';
import { AtStrategy } from './strategies/at.strategy.js';
import { PasswordHasher } from '@nestjs/authentication';

@Module({
  imports: [UsersModule, 
    PassportModule, 
    JwtModule.register({})
  ],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy, PasswordHasher ],
})
export class AuthModule {}

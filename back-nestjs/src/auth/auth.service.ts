import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service.js';
import { PasswordHasher } from '@nestjs/authentication';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import { LoginUserDto } from '../users/dto/login-user.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async register(dto: CreateUserDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) throw new ForbiddenException('Email уже занят');
    const newUser = await  this.usersService.create(dto);
    return true;
  }

  async login(dto: LoginUserDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Неверные учетные данные');

    const passwordMatches = await this.passwordHasher.verify(dto.password, user.passwordHash);
    if (!passwordMatches) throw new UnauthorizedException('Неверные учетные данные');

    const tokens = await this.generateTokens(user.id, user.email);
    await this.usersService.updateRefreshToken(user.id, tokens.refreshToken);

    const userProfile = await this.usersService.findProfilebyUserId(user.id);    

    const responce = {
      ...tokens,
      user: {...userProfile, id: user.id}
    }

    return responce;
  }

  async logout(userId: number) {
    await this.usersService.updateRefreshToken(userId, null);
  }

  async refreshTokens(userId: number, rt: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.hashedRefreshToken) throw new ForbiddenException('Доступ запрещен');

    const rtMatches = await this.passwordHasher.verify(rt, user.hashedRefreshToken);
    if (!rtMatches) throw new ForbiddenException('Доступ запрещен');

    const tokens = await this.generateTokens(user.id, user.email);
    await this.usersService.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  private async generateTokens(userId: number, email: string) {
    
    const at = await this.jwtService.signAsync({ sub: userId, email }, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION') as any,
      }
    );

    const rt = await this.jwtService.signAsync({ sub: userId, email }, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION') as any,
      }
    );

    return { accessToken: at, refreshToken: rt };
  }
}

import { Controller, Post, Body, Res, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service.js';
import { Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import { LoginUserDto } from '../users/dto/login-user.dto.js';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {

  private readonly REFRESH_NAME = 'refresh_token';

  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) {}

  private setCookie(res: Response, token: string) {
    res.cookie(this.REFRESH_NAME, token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: this.configService.get<boolean>('NODE_ENV'),
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
    });
  }

  @Post('registry')
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginUserDto, @Res({ passthrough: true }) res: any) {
    const tokens = await this.authService.login(dto);
    this.setCookie(res, tokens.refreshToken);
    return { accessToken: tokens.accessToken, user: tokens.user };
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: any, @Res({ passthrough: true }) res: any) {
    await this.authService.logout(req.user.id);
    res.clearCookie(this.REFRESH_NAME);
    return { success: true };
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: any, @Res({ passthrough: true }) res: any) {
    const tokens = await this.authService.refreshTokens(req.user.id, req.user.refreshToken);
    this.setCookie(res, tokens.refreshToken);
    return { accessToken: tokens.accessToken };
  }

  // // Пример защищенного эндпоинта
  // @UseGuards(AuthGuard('jwt'))
  // @Post('profile')
  // getProfile(@Req() req: any) {
  //   return req.user;
  // }
}

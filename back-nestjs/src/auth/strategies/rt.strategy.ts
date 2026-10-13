import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: (req: Request) => {
        if (!req || !req.cookies) return null;
        return req.cookies['refresh_token'];
      },
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET') || '',
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: { sub: number; email: string }) {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) throw new UnauthorizedException();
    return { id: payload.sub, email: payload.email, refreshToken, roles: []};
  }
}
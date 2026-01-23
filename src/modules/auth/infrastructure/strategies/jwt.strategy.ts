import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { env } from '../../../../core/config/env.config';
import { UserPayload } from '../../../../shared/interfaces/user-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.jwt.secret,
    });
  }

  async validate(payload: UserPayload): Promise<UserPayload> {
    return {
      uuid: payload.uuid,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      status: payload.status,
    };
  }
}

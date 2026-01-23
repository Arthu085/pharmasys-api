import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../../user/domain/entities/user.entity';
import { UserPayload } from '../../../../shared/interfaces/user-payload.interface';
import { RoleEnum } from '../../../../shared/enums/role.enum';

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(user: UserEntity): string {
    const payload: UserPayload = {
      id: user.id,
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      role: user.role?.name as RoleEnum,
      status: user.status,
    };

    return this.jwtService.sign(payload);
  }

  verifyToken(token: string): UserPayload {
    return this.jwtService.verify<UserPayload>(token);
  }

  decodeToken(token: string): UserPayload | null {
    return this.jwtService.decode(token) as UserPayload | null;
  }
}

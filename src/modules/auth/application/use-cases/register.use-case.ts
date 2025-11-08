import { Injectable } from '@nestjs/common';
import { AuthDomainService } from '../../domain/services/auth-domain.service';
import { JwtTokenService } from '../../domain/services/jwt-token.service';
import { RegisterDto } from '../dtos/register.dto';
import { RegisterResponseDto } from '../dtos/register-response.dto';
import { CreateUserUseCase } from 'src/modules/user/application/use-cases/create-user.use-case';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly authDomainService: AuthDomainService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async execute(dto: RegisterDto): Promise<RegisterResponseDto> {
    await this.authDomainService.validateRoleForRegister(dto.role);

    const newUserEntity = await this.createUserUseCase.createEntity(dto);

    const token = this.jwtTokenService.generateToken(newUserEntity);

    return {
      id: newUserEntity.id,
      name: newUserEntity.name,
      email: newUserEntity.email,
      role: newUserEntity.role.name,
      token,
    };
  }
}

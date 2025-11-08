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

    const newUser = await this.createUserUseCase.execute(dto);

    const userForToken = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: { name: newUser.role as string },
    };

    const token = this.jwtTokenService.generateToken(userForToken as any);

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role as string,
      token,
    };
  }
}

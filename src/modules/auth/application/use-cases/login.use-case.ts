import { Injectable } from '@nestjs/common';
import { AuthDomainService } from '../../domain/services/auth-domain.service';
import { JwtTokenService } from '../../domain/services/jwt-token.service';
import { LoginDto } from '../dtos/login.dto';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly authDomainService: AuthDomainService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async execute(dto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.findOneUserUseCase.findByEmail(dto.email, false);

    await this.authDomainService.validateCredentialsLogin(user, dto.password);

    const token = this.jwtTokenService.generateToken(user!);

    return { token };
  }
}

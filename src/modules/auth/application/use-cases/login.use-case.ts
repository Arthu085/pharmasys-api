import { Injectable } from '@nestjs/common';
import { AuthDomainService } from '../../domain/services/auth-domain.service';
import { JwtTokenService } from '../../domain/services/jwt-token.service';
import { LoginDto } from '../dtos/login.dto';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';
import { Email } from 'src/modules/user/domain/value-objects/email.vo';
import { Password } from 'src/modules/user/domain/value-objects/password.vo';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly authDomainService: AuthDomainService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async execute(dto: LoginDto): Promise<LoginResponseDto> {
    const email = Email.create(dto.email);
    const password = Password.create(dto.password);

    const user = await this.findOneUserUseCase.findByEmailWithoutValidation(
      email.getValue(),
    );

    const validatedUser = await this.authDomainService.validateCredentialsLogin(
      user,
      password.getValue(),
    );

    const token = this.jwtTokenService.generateToken(validatedUser);

    return { token };
  }
}

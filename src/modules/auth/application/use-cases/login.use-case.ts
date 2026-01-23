import { Injectable } from '@nestjs/common';
import { AuthDomainService } from '../../domain/services/auth-domain.service';
import { JwtTokenService } from '../../domain/services/jwt-token.service';
import { LoginDto } from '../dtos/login.dto';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';
import { UserEmail } from 'src/modules/user/domain/value-objects/user-email.vo';
import { UserPassword } from 'src/modules/user/domain/value-objects/user-password.vo';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly authDomainService: AuthDomainService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async execute(dto: LoginDto): Promise<LoginResponseDto> {
    const binds = {
      email: UserEmail.create(dto.email),
      password: UserPassword.create(dto.password),
    };

    const user = await this.findOneUserUseCase.findByEmail(
      binds.email.getValue(),
    );

    const validatedUser = await this.authDomainService.validateCredentialsLogin(
      user,
      binds.password.getValue(),
    );

    const token = this.jwtTokenService.generateToken(validatedUser);

    return plainToInstance(
      LoginResponseDto,
      {
        token,
        name: validatedUser.name,
        role: validatedUser.role,
        status: validatedUser.status,
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }
}

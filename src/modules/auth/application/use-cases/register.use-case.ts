import { Injectable } from '@nestjs/common';
import { AuthDomainService } from '../../domain/services/auth-domain.service';
import { JwtTokenService } from '../../domain/services/jwt-token.service';
import { RegisterDto } from '../dtos/register.dto';
import { RegisterResponseDto } from '../dtos/register-response.dto';
import { CreateUserUseCase } from 'src/modules/user/application/use-cases/create-user.use-case';
import { UserEmail } from 'src/modules/user/domain/value-objects/user-email.vo';
import { UserPassword } from 'src/modules/user/domain/value-objects/user-password.vo';
import { UserName } from 'src/modules/user/domain/value-objects/user-name.vo';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly authDomainService: AuthDomainService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async execute(dto: RegisterDto): Promise<RegisterResponseDto> {
    const binds = {
      name: UserName.create(dto.name),
      email: UserEmail.create(dto.email),
      password: UserPassword.create(dto.password),
      role: this.authDomainService.validateRoleForRegister(dto.role),
    };

    const newUser = await this.createUserUseCase.register(binds);

    const token = this.jwtTokenService.generateToken(newUser);

    return plainToInstance(
      RegisterResponseDto,
      { token },
      {
        excludeExtraneousValues: true,
      },
    );
  }
}

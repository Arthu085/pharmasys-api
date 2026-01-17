import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { RegisterUseCase } from '../../application/use-cases/register.use-case';
import { LoginDto } from '../../application/dtos/login.dto';
import { RegisterDto } from '../../application/dtos/register.dto';
import { Public } from '../decorators/public.decorator';
import { ResponseMessage } from 'src/core/decorators/response-message.decorator';

@Controller('auth')
@Public()
export class AuthPublicController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  @Post('login')
  @ResponseMessage('Login realizado com sucesso')
  async login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto);
  }

  @Post('register')
  @ResponseMessage('Usuário registrado com sucesso')
  async register(@Body() dto: RegisterDto) {
    return this.registerUseCase.execute(dto);
  }
}

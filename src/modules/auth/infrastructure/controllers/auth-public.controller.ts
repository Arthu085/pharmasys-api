import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { RegisterUseCase } from '../../application/use-cases/register.use-case';
import { LoginDto } from '../../application/dtos/login.dto';
import { RegisterDto } from '../../application/dtos/register.dto';
import { Public } from '../decorators/public.decorator';
import { ResponseMessage } from 'src/core/decorators/response-message.decorator';
import { env } from 'src/core/config/env.config';

@Controller('auth')
@Public()
export class AuthPublicController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  @Post('login')
  @ResponseMessage('Login realizado com sucesso')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.loginUseCase.execute(dto);

    if (result?.token) {
      response.cookie('token', result.token, {
        httpOnly: true,
        secure: env.nodeEnv === 'production',
        sameSite: env.nodeEnv === 'production' ? 'none' : 'lax',
        maxAge: 4 * 60 * 60 * 1000, // 4 horas
      });

      const { token, ...dataWithoutToken } = result;
      return dataWithoutToken;
    }

    return result;
  }

  @Post('register')
  @ResponseMessage('Usuário registrado com sucesso')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.registerUseCase.execute(dto);

    if (result?.token) {
      response.cookie('token', result.token, {
        httpOnly: true,
        secure: env.nodeEnv === 'production',
        sameSite: env.nodeEnv === 'production' ? 'none' : 'lax',
        maxAge: 4 * 60 * 60 * 1000, // 4 horas
      });

      const { token, ...dataWithoutToken } = result;
      return dataWithoutToken;
    }

    return result;
  }

  @Post('logout')
  @ResponseMessage('Logout realizado com sucesso')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('token', '', {
      httpOnly: true,
      secure: env.nodeEnv === 'production',
      sameSite: env.nodeEnv === 'production' ? 'none' : 'lax',
      maxAge: 0,
    });

    return { message: 'Logout realizado com sucesso' };
  }
}

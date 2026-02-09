import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../decorators/current-user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ResponseMessage } from 'src/core/decorators/response-message.decorator';
import { FindOneProfileUseCase } from '../../application/use-cases/find-one-profile.use-case';
import { UserPayload } from 'src/shared/interfaces/user-payload.interface';

@Controller('auth')
@UseGuards(JwtAuthGuard)
export class AuthProtectedController {
  constructor(private readonly findOneProfileUseCase: FindOneProfileUseCase) {}

  @Get('profile')
  @ResponseMessage('Perfil encontrado com sucesso')
  profile(@CurrentUser() user: UserPayload) {
    return this.findOneProfileUseCase.execute(user);
  }
}

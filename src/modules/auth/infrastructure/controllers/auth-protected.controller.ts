import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UserPayload } from '../../../../shared/interfaces/user-payload.interface';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
@UseGuards(JwtAuthGuard)
export class AuthProtectedController {
  @Get('profile')
  getProfile(@CurrentUser() user: UserPayload) {
    return user;
  }
}

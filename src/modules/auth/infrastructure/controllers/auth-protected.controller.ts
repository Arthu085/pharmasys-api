import { Controller, Get, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UserPayload } from '../../../../shared/interfaces/user-payload.interface';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ProfileResponseDto } from '../../application/dtos/profile-response.dto';

@Controller('auth')
@UseGuards(JwtAuthGuard)
export class AuthProtectedController {
  @Get('profile')
  getProfile(@CurrentUser() user: UserPayload) {
    return plainToInstance(ProfileResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }
}

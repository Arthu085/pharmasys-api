import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Public } from 'src/core/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}

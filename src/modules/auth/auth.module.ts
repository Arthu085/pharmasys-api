import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { env } from '../../core/config/env.config';
import { AuthDomainService } from './domain/services/auth-domain.service';
import { JwtTokenService } from './domain/services/jwt-token.service';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { AuthPublicController } from './infrastructure/controllers/auth-public.controller';
import { AuthProtectedController } from './infrastructure/controllers/auth-protected.controller';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { JwtAuthGuard } from './infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from './infrastructure/guards/roles.guard';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: env.jwt.secret,
      signOptions: { expiresIn: env.jwt.expiresIn },
    }),
  ],
  controllers: [AuthPublicController, AuthProtectedController],
  providers: [
    AuthDomainService,
    JwtTokenService,
    LoginUseCase,
    RegisterUseCase,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
  ],
  exports: [
    AuthDomainService,
    JwtTokenService,
    JwtAuthGuard,
    RolesGuard,
    JwtModule,
  ],
})
export class AuthModule {}

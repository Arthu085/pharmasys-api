import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleEntity } from './domain/entities/role.entity';
import { UserEntity } from './domain/entities/user.entity';
import { UserDomainService } from './domain/services/user-domain.service';
import { AuthModule } from '../auth/auth.module';
import { RoleRepository } from './infrastructure/repositories/role.repository';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UserProtectedController } from './infrastructure/controllers/user-protected.controller';
import { UserPublicController } from './infrastructure/controllers/user-public.controller';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';
import { FindAllUserUseCase } from './application/use-cases/find-all-user.use-case';
import { FindOneRoleUseCase } from './application/use-cases/find-one-role.use-case';
import { FindOneUserUseCase } from './application/use-cases/find-one-user.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserPublicController, UserProtectedController],
  providers: [
    UserRepository,
    RoleRepository,
    UserDomainService,
    CreateUserUseCase,
    FindOneUserUseCase,
    FindOneRoleUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
    FindAllUserUseCase,
  ],
  exports: [
    UserRepository,
    FindOneUserUseCase,
    FindOneRoleUseCase,
    UserDomainService,
    CreateUserUseCase,
  ],
})
export class UserModule {}

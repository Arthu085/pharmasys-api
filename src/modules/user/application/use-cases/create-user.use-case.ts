import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { IPasswordHasher } from '../../domain/services/password-hasher.interface';
import { UserCreateDto } from '../dtos/user-create.dto';
import { FindOneRoleUseCase } from './find-one-role.use-case';
import { FindOneUserUseCase } from './find-one-user.use-case';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserEmail } from '../../domain/value-objects/user-email.vo';
import { UserPassword } from '../../domain/value-objects/user-password.vo';
import { UserName } from '../../domain/value-objects/user-name.vo';
import { UserDomainService } from '../../domain/services/user-domain.service';
import { RoleEnum } from 'src/shared/enums/role.enum';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    @Inject(IPasswordHasher)
    private readonly passwordHasher: IPasswordHasher,
    private readonly findOneRoleUseCase: FindOneRoleUseCase,
    @Inject(forwardRef(() => FindOneUserUseCase))
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly userDomainService: UserDomainService,
  ) {}

  async execute(dto: UserCreateDto, userId: number): Promise<void> {
    const binds = {
      name: UserName.create(dto.name),
      email: UserEmail.create(dto.email),
      password: UserPassword.create(dto.password),
      role: await this.findOneRoleUseCase.findByName(dto.role),
    };

    const userCreating = await this.findOneUserUseCase.findById(userId);
    const existingUser = await this.findOneUserUseCase.findByEmail(
      binds.email.getValue(),
    );

    this.userDomainService.validateUserExistsCreate(existingUser);

    const hashedPassword = await this.passwordHasher.hash(
      binds.password.getValue(),
    );

    await this.userRepository.create({
      name: binds.name.getValue(),
      email: binds.email.getValue(),
      password: hashedPassword,
      role: binds.role,
      userCreated: userCreating,
    });
  }

  async register(binds: {
    name: UserName;
    email: UserEmail;
    password: UserPassword;
    role: RoleEnum;
  }): Promise<UserEntity> {
    const existingUser = await this.findOneUserUseCase.findByEmail(
      binds.email.getValue(),
    );

    this.userDomainService.validateUserExistsCreate(existingUser);

    const hashedPassword = await this.passwordHasher.hash(
      binds.password.getValue(),
    );
    const roleEntity = await this.findOneRoleUseCase.findByName(binds.role);

    return await this.userRepository.create({
      name: binds.name.getValue(),
      email: binds.email.getValue(),
      password: hashedPassword,
      role: roleEntity,
    });
  }
}

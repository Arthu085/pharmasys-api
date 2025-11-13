import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { UserDomainService } from '../../domain/services/user-domain.service';
import { UserCreateDto } from '../dtos/user-create.dto';
import { FindOneRoleUseCase } from './find-one-role.use-case';
import { FindOneUserUseCase } from './find-one-user.use-case';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { UserEntity } from '../../domain/entities/user.entity';
import { Email } from '../../domain/value-objects/email.vo';
import { Password } from '../../domain/value-objects/password.vo';
import { UserName } from '../../domain/value-objects/user-name.vo';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly findOneRoleUseCase: FindOneRoleUseCase,
    @Inject(forwardRef(() => FindOneUserUseCase))
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly userDomainService: UserDomainService,
  ) {}

  async execute(dto: UserCreateDto): Promise<void> {
    await this.createEntity(dto);
  }

  async createEntity(dto: UserCreateDto): Promise<UserEntity> {
    const name = UserName.create(dto.name);
    const email = Email.create(dto.email);
    const password = Password.create(dto.password);
    const role = await this.findOneRoleUseCase.findByName(RoleEnum[dto.role]);
    const existingUser =
      await this.findOneUserUseCase.findByEmailWithoutValidation(
        email.getValue(),
      );

    if (existingUser) {
      this.userDomainService.validateUserExists();
    }

    const hashedPassword = await this.userDomainService.hashPassword(
      password.getValue(),
    );

    const newUser = await this.userRepository.create({
      name: name.getValue(),
      email: email.getValue(),
      password: hashedPassword,
      role,
    });

    return newUser;
  }
}

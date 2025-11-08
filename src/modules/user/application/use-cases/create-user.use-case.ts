import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { UserDomainService } from '../../domain/services/user-domain.service';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserCreateDto } from '../dtos/user-create.dto';
import { FindOneRoleUseCase } from './find-one-role.use-case';
import { FindOneUserUseCase } from './find-one-user.use-case';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { UserResponseDto } from '../dtos/user-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly findOneRoleUseCase: FindOneRoleUseCase,
    @Inject(forwardRef(() => FindOneUserUseCase))
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly userDomainService: UserDomainService,
  ) {}

  async execute(dto: UserCreateDto): Promise<UserResponseDto> {
    const role = await this.findOneRoleUseCase.findByName(RoleEnum[dto.role]);
    const user = await this.findOneUserUseCase.findByEmail(dto.email, false);

    await this.userDomainService.validateUserCreate(user, role);

    const hashedPassword = await this.userDomainService.hashPassword(
      dto.password,
    );

    const data = plainToInstance(
      UserResponseDto,
      await this.userRepository.create({
        ...dto,
        password: hashedPassword,
        role: role!,
      }),
      { excludeExtraneousValues: true },
    );

    return data;
  }
}

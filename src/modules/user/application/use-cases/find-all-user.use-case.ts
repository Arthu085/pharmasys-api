import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { UserFilterDto } from '../dtos/user-filter.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
import { IPaginatedResponse } from 'src/shared/interfaces/paginated-response.interface';

@Injectable()
export class FindAllUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    filters: UserFilterDto,
  ): Promise<IPaginatedResponse<UserResponseDto>> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const [users, total] = await this.userRepository.findAll(
      filters,
      limit,
      skip,
    );

    const data = plainToInstance(UserResponseDto, users, {
      excludeExtraneousValues: true,
    });

    const lastPage = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        lastPage,
      },
    };
  }
}

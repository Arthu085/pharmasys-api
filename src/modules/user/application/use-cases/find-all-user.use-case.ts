import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { UserFilterDto } from '../dtos/user-filter.dto';
import { IPaginatedResponse } from 'src/shared/interfaces/paginated-response.interface';
import { PaginatedResponseDto } from 'src/shared/dtos/paginated-response.dto';
import { UserResponseAllDto } from '../dtos/user-response-all.dto';

@Injectable()
export class FindAllUserUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(
    filters: UserFilterDto,
  ): Promise<IPaginatedResponse<UserResponseAllDto>> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const [users, total] = await this.userRepository.findAll(
      filters,
      limit,
      skip,
    );

    const lastPage = Math.ceil(total / limit);

    const response = new PaginatedResponseDto<UserResponseAllDto>();

    response.data = plainToInstance(UserResponseAllDto, users, {
      excludeExtraneousValues: true,
    });
    response.meta = {
      total,
      page,
      limit,
      lastPage,
    };

    return response;
  }
}

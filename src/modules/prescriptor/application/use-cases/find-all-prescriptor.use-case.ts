import { Inject, Injectable } from '@nestjs/common';
import { IPrescriptorRepository } from '../../domain/repositories/prescriptor.repository.interface';
import { PrescriptorFilterDto } from '../dtos/prescriptor-filter.dto';
import { IPaginatedResponse } from 'src/shared/interfaces/paginated-response.interface';
import { PrescriptorResponseDto } from '../dtos/prescriptor-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindAllPrescriptorUseCase {
  constructor(
    @Inject(IPrescriptorRepository)
    private readonly prescriptorRepository: IPrescriptorRepository,
  ) {}

  async execute(
    filters: PrescriptorFilterDto,
  ): Promise<IPaginatedResponse<PrescriptorResponseDto | null>> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const [prescriptors, total] = await this.prescriptorRepository.findAll(
      filters,
      limit,
      skip,
    );

    const data = plainToInstance(PrescriptorResponseDto, prescriptors, {
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

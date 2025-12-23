import { Inject, Injectable } from '@nestjs/common';
import { IPrescriptorRepository } from '../../domain/repositories/prescriptor.repository.interface';
import { PrescriptorFilterDto } from '../dtos/prescriptor-filter.dto';
import { IPaginatedResponse } from 'src/shared/interfaces/paginated-response.interface';
import { plainToInstance } from 'class-transformer';
import { PaginatedResponseDto } from 'src/shared/dtos/paginated-response.dto';
import { PrescriptorResponseAllDto } from '../dtos/prescriptor-response-all.dto';

@Injectable()
export class FindAllPrescriptorUseCase {
  constructor(
    @Inject(IPrescriptorRepository)
    private readonly prescriptorRepository: IPrescriptorRepository,
  ) {}

  async execute(
    filters: PrescriptorFilterDto,
  ): Promise<IPaginatedResponse<PrescriptorResponseAllDto | null>> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const [prescriptors, total] = await this.prescriptorRepository.findAll(
      filters,
      limit,
      skip,
    );

    const lastPage = Math.ceil(total / limit);

    const response = new PaginatedResponseDto<PrescriptorResponseAllDto>();

    response.data = plainToInstance(PrescriptorResponseAllDto, prescriptors, {
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

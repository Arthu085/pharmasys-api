import { Injectable } from '@nestjs/common';
import { PrescriptorRepository } from '../../infraestructure/repositories/prescriptor.repository';
import { PrescriptorFilterDto } from '../dtos/prescriptor-filter.dto';
import { IPaginatedResponse } from 'src/shared/interfaces/paginated-response.interface';
import { PrescriptorResponseDto } from '../dtos/prescriptor-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindAllPrescriptorUseCase {
  constructor(private readonly prescriptorRepository: PrescriptorRepository) {}

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

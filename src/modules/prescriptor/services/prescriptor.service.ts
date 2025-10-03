import { Injectable, Logger } from '@nestjs/common';
import { PrescriptorRepository } from '../repositories/prescriptor.repository';
import { FilterPrescriptorDto } from '../DTOs/filter.prescriptor.dto';
import { IPaginatedResponse } from 'src/shared/interfaces/paginated-response.interface';
import { ResponsePrescriptorDto } from '../DTOs/response.prescriptor.dto';
import { toResponsePrescriptorDto } from '../mappers/prescriptor.mapper';

@Injectable()
export class PrescriptorService {
  private readonly logger = new Logger(PrescriptorService.name);

  constructor(private readonly prescriptorRepository: PrescriptorRepository) {}

  async findAllPrescriptors(
    filters: FilterPrescriptorDto,
  ): Promise<IPaginatedResponse<ResponsePrescriptorDto>> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;
    const [prescriptors, total] = await this.prescriptorRepository.findAll(
      filters,
      limit,
      skip,
    );
    const data = prescriptors.map((user) => toResponsePrescriptorDto(user));
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

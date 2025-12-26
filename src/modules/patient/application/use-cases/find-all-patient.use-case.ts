import { Inject, Injectable } from '@nestjs/common';

import { IPaginatedResponse } from 'src/shared/interfaces/paginated-response.interface';
import { plainToInstance } from 'class-transformer';
import { PaginatedResponseDto } from 'src/shared/dtos/paginated-response.dto';
import { IPatientRepository } from '../../domain/repositories/patient.repository.interface';
import { PatientFilterDto } from '../dtos/patient-filter.dto';
import { PatientResponseAllDto } from '../dtos/patient-response-all.dto';

@Injectable()
export class FindAllPatientUseCase {
  constructor(
    @Inject(IPatientRepository)
    private readonly patientRepository: IPatientRepository,
  ) {}

  async execute(
    filters: PatientFilterDto,
  ): Promise<IPaginatedResponse<PatientResponseAllDto | null>> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const [patients, total] = await this.patientRepository.findAll(
      filters,
      limit,
      skip,
    );

    const lastPage = Math.ceil(total / limit);

    const response = new PaginatedResponseDto<PatientResponseAllDto>();

    response.data = plainToInstance(PatientResponseAllDto, patients, {
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

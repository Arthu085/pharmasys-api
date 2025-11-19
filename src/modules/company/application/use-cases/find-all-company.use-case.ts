import { Inject, Injectable } from '@nestjs/common';
import { IPaginatedResponse } from 'src/shared/interfaces/paginated-response.interface';
import { plainToInstance } from 'class-transformer';
import { ICompanyRepository } from '../../domain/repositories/company.repository.interface';
import { CompanyFilterDto } from '../dtos/company-filter.dto';
import { CompanyResponseDto } from '../dtos/company-response.dto';

@Injectable()
export class FindAllCompanyUseCase {
  constructor(
    @Inject(ICompanyRepository)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async execute(
    filters: CompanyFilterDto,
  ): Promise<IPaginatedResponse<CompanyResponseDto | null>> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const [companies, total] = await this.companyRepository.findAll(
      filters,
      limit,
      skip,
    );

    const data = plainToInstance(CompanyResponseDto, companies, {
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

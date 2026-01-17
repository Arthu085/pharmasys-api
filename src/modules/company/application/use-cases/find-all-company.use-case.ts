import { Inject, Injectable } from '@nestjs/common';
import { IPaginatedResponse } from 'src/shared/interfaces/paginated-response.interface';
import { plainToInstance } from 'class-transformer';
import { ICompanyRepository } from '../../domain/repositories/company.repository.interface';
import { CompanyFilterDto } from '../dtos/company-filter.dto';
import { PaginatedResponseDto } from 'src/shared/dtos/paginated-response.dto';
import { CompanyResponseAllDto } from '../dtos/company-response-all.dto';

@Injectable()
export class FindAllCompanyUseCase {
  constructor(
    @Inject(ICompanyRepository)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async execute(
    filters: CompanyFilterDto,
  ): Promise<IPaginatedResponse<CompanyResponseAllDto>> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const [companies, total] = await this.companyRepository.findAll(
      filters,
      limit,
      skip,
    );

    const lastPage = Math.ceil(total / limit);

    const response = new PaginatedResponseDto<CompanyResponseAllDto>();

    response.data = plainToInstance(CompanyResponseAllDto, companies, {
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

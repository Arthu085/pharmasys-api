import { Inject, Injectable } from '@nestjs/common';
import { IPaginatedResponse } from 'src/shared/interfaces/paginated-response.interface';
import { plainToInstance } from 'class-transformer';

import { PaginatedResponseDto } from 'src/shared/dtos/paginated-response.dto';
import { ITransferRequestRepository } from '../../domain/repositories/transfer-request.repository.interface';
import { TransferRequestFilterDto } from '../dtos/transfer-request-filter.dto';
import { TransferRequestResponseAllDto } from '../dtos/transfer-request-response-all.dto';

@Injectable()
export class FindAllTransferRequestUseCase {
  constructor(
    @Inject(ITransferRequestRepository)
    private readonly transferRequestRepository: ITransferRequestRepository,
  ) {}

  async execute(
    filters: TransferRequestFilterDto,
  ): Promise<IPaginatedResponse<TransferRequestResponseAllDto | null>> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const [transferRequests, total] =
      await this.transferRequestRepository.findAll(filters, limit, skip);

    const lastPage = Math.ceil(total / limit);

    const response = new PaginatedResponseDto<TransferRequestResponseAllDto>();

    response.data = plainToInstance(
      TransferRequestResponseAllDto,
      transferRequests,
      {
        excludeExtraneousValues: true,
      },
    );
    response.meta = {
      total,
      page,
      limit,
      lastPage,
    };

    return response;
  }
}

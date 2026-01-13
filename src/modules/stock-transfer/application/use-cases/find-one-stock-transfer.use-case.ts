import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UUID } from 'crypto';

import { IStockTransferRepository } from '../../domain/repositories/stock-transfer.repository.interface';
import { StockTransferResponseOneDto } from '../dtos/stock-transfer-response-one.dto';
import { StockTransferDomainService } from '../../domain/services/stock-transfer-domain.service';

@Injectable()
export class FindOneStockTransferUseCase {
  constructor(
    @Inject(IStockTransferRepository)
    private readonly stockTransferRepository: IStockTransferRepository,
    private readonly stockTransferDomainService: StockTransferDomainService,
  ) {}

  async execute(uuid: UUID): Promise<StockTransferResponseOneDto> {
    const stockTransfer = await this.stockTransferRepository.findOne(uuid);
    this.stockTransferDomainService.validateStockTransfer(stockTransfer);

    return plainToInstance(StockTransferResponseOneDto, stockTransfer, {
      excludeExtraneousValues: true,
    });
  }
}

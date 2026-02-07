import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { IStockLocationRepository } from '../../domain/repositories/stock-location.repository.interface';
import { FindOneStockLocationUseCase } from './find-one-stock-location.use-case';
import { StockLocationDomainService } from '../../domain/services/stock-location-domain.service';
import { IEntityUsageChecker } from 'src/shared/interfaces/entity-usage-checker.service.interface';
import { StockLocationEntity } from '../../domain/entities/stock-location.entity';

@Injectable()
export class DeleteStockLocationUseCase {
  constructor(
    @Inject(IStockLocationRepository)
    private readonly stockLocationRepository: IStockLocationRepository,
    private readonly findOneStockLocationUseCase: FindOneStockLocationUseCase,
    private readonly stockLocationDomainService: StockLocationDomainService,
    @Inject(IEntityUsageChecker)
    private readonly entityUsageChecker: IEntityUsageChecker,
  ) {}

  async execute(uuid: UUID): Promise<void> {
    const stockLocation =
      await this.findOneStockLocationUseCase.findEntityByUuid(uuid, false);

    this.stockLocationDomainService.validateStockLocationCentralStock(
      stockLocation,
    );

    await this.entityUsageChecker.assertNotReferenced(
      StockLocationEntity,
      uuid,
      'Local de estoque',
    );

    await this.stockLocationRepository.softDelete(uuid);
  }
}

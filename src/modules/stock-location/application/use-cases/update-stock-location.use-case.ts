import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { IStockLocationRepository } from '../../domain/repositories/stock-location.repository.interface';
import { StockLocationUpdateDto } from '../dtos/stock-location-update.dto';
import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';
import { FindOneStockLocationUseCase } from './find-one-stock-location.use-case';
import { StockLocationDomainService } from '../../domain/services/stock-location-domain.service';
import { ChangeStatusDto } from 'src/shared/dtos/change-status.dto';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { StockLocationName } from '../../domain/value-objects/stock-location-name.vo';
import { StockLocationCode } from '../../domain/value-objects/stock-location-code.vo';
import { StockLocationCodeAlreadyExistsException } from '../../domain/exceptions/stock-location-code-already-exists.exception';

@Injectable()
export class UpdateStockLocationUseCase {
  constructor(
    @Inject(IStockLocationRepository)
    private readonly stockLocationRepository: IStockLocationRepository,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly findOneStockLocationUseCase: FindOneStockLocationUseCase,
    private readonly stockLocationDomainService: StockLocationDomainService,
  ) {}

  async execute(
    uuid: UUID,
    dto: StockLocationUpdateDto,
    userId: number,
  ): Promise<void> {
    const user = await this.findOneUserUseCase.findById(userId);
    const stockLocation =
      await this.findOneStockLocationUseCase.findEntityByUuid(uuid);

    this.stockLocationDomainService.validateStockLocationCentralStock(
      stockLocation,
    );

    if (dto.code) {
      const code = StockLocationCode.create(dto.code);
      const currentCode = StockLocationCode.create(stockLocation.code);

      if (!code.equals(currentCode)) {
        const existingStockLocation =
          await this.findOneStockLocationUseCase.findByCode(code.getValue());

        if (
          existingStockLocation &&
          existingStockLocation.id !== stockLocation.id
        ) {
          throw new StockLocationCodeAlreadyExistsException();
        }
      }

      stockLocation.changeCode(code);
    }

    if (dto.name) {
      const name = StockLocationName.create(dto.name);
      stockLocation.changeName(name);
    }

    stockLocation.userUpdated = user;

    await this.stockLocationRepository.update(stockLocation);
  }

  async updateStatus(
    uuid: UUID,
    dto: ChangeStatusDto,
    userId: number,
  ): Promise<void> {
    const user = await this.findOneUserUseCase.findById(userId);
    const stockLocation =
      await this.findOneStockLocationUseCase.findEntityByUuid(uuid, false);

    this.stockLocationDomainService.validateStockLocationCentralStock(
      stockLocation,
    );

    this.stockLocationDomainService.validateStockLocationSameStatus(
      stockLocation,
      dto.status,
    );

    if (dto.status === StatusEnum.ATIVO) {
      stockLocation.activate();
    } else {
      stockLocation.deactivate();
    }

    stockLocation.userUpdated = user;

    await this.stockLocationRepository.update(stockLocation);
  }
}

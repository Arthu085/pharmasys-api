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
    const binds = {
      userUpdated: await this.findOneUserUseCase.findById(userId),
      name: dto.name ? StockLocationName.create(dto.name) : undefined,
      code: dto.code ? StockLocationCode.create(dto.code) : undefined,
    };

    const stockLocation =
      await this.findOneStockLocationUseCase.findEntityByUuid(uuid);

    this.stockLocationDomainService.validateStockLocationAndEnsureActive(
      stockLocation,
    );

    this.stockLocationDomainService.validateStockLocationCentralStock(
      stockLocation,
    );

    if (binds.name) {
      stockLocation.changeName(binds.name);
    }

    if (binds.code) {
      const currentCode = StockLocationCode.create(stockLocation.code);
      if (!binds.code.equals(currentCode)) {
        const existingStockLocationWithCode =
          await this.findOneStockLocationUseCase.findByCode(
            binds.code.getValue(),
          );
        this.stockLocationDomainService.validateExistsStockLocationUpdate(
          stockLocation,
          existingStockLocationWithCode,
        );
        stockLocation.changeCode(binds.code);
      }
    }

    stockLocation.userUpdated = binds.userUpdated;

    await this.stockLocationRepository.update(
      stockLocation.uuid,
      stockLocation,
    );
  }

  async updateStatus(
    uuid: UUID,
    dto: ChangeStatusDto,
    userId: number,
  ): Promise<void> {
    const binds = {
      userUpdated: await this.findOneUserUseCase.findById(userId),
    };

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

    stockLocation.userUpdated = binds.userUpdated;

    await this.stockLocationRepository.update(
      stockLocation.uuid,
      stockLocation,
    );
  }
}

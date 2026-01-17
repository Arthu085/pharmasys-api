import { Inject, Injectable } from '@nestjs/common';

import { DataSourceProvider } from 'src/core/database/providers/data-source.provider';
import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';
import { IItemDispensationRepository } from '../../domain/repositories/item-dispensation.repository.interface';
import { FindOneStockLocationUseCase } from 'src/modules/stock-location/application/use-cases/find-one-stock-location.use-case';
import { ItemDispensationCreateDto } from '../dtos/item-dispensation-create.dto';
import { ItemDispensationItemCreateDto } from '../dtos/item-dispensation-item-create.dto';
import { FindOnePatientUseCase } from 'src/modules/patient/application/use-cases/find-one-patient.use-case';
import { FindOnePrescriptorUseCase } from 'src/modules/prescriptor/application/use-cases/find-one-prescriptor.use-case';
import { CreateItemDispensationItemUseCase } from './create-item-dispensation-item.use-case';
import { ItemDispensationDate } from '../../domain/value-objects/item-dispensation-date.vo';

@Injectable()
export class CreateItemDispensationUseCase {
  constructor(
    @Inject(IItemDispensationRepository)
    private readonly itemDispensationRepository: IItemDispensationRepository,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly findOneStockLocationUseCase: FindOneStockLocationUseCase,
    private readonly createItemDispensationItemUseCase: CreateItemDispensationItemUseCase,
    private readonly findOnePatientUseCase: FindOnePatientUseCase,
    private readonly findOnePrescriptorUseCase: FindOnePrescriptorUseCase,
    private readonly dataSourceProvider: DataSourceProvider,
  ) {}

  async execute(
    dto: ItemDispensationCreateDto,
    dtoItems: ItemDispensationItemCreateDto[],
    userId: number,
  ): Promise<void> {
    await this.dataSourceProvider
      .getDataSource()
      .transaction(async (entityManager) => {
        const binds = {
          userCreated: await this.findOneUserUseCase.findById(userId),
          dispensationDate: ItemDispensationDate.create(dto.dispensationDate),
          patient: await this.findOnePatientUseCase.findEntityByUuid(
            dto.patient,
          ),
          prescriptor: await this.findOnePrescriptorUseCase.findEntityByUuid(
            dto.prescriptor,
          ),
          stockLocation:
            await this.findOneStockLocationUseCase.findEntityByUuid(
              dto.stockLocation,
            ),
        };

        const itemDispensationEntity =
          await this.itemDispensationRepository.create(
            {
              ...binds,
              dispensationDate: binds.dispensationDate.getValue(),
            },
            entityManager,
          );

        for (const dtoItem of dtoItems) {
          await this.createItemDispensationItemUseCase.execute(
            dtoItem,
            itemDispensationEntity,
            entityManager,
          );
        }
      });
  }
}

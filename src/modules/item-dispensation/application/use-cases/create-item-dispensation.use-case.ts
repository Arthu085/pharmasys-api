import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

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
    private readonly dataSource: DataSource,
  ) {}

  async execute(
    dto: ItemDispensationCreateDto,
    dtoItems: ItemDispensationItemCreateDto[],
    userId: number,
  ): Promise<void> {
    await this.dataSource.transaction(async (entityManager) => {
      const binds = {
        dispensationDate: ItemDispensationDate.create(dto.dispensationDate),
        patient: await this.findOnePatientUseCase.findEntityByUuid(dto.patient),
        prescriptor: await this.findOnePrescriptorUseCase.findEntityByUuid(
          dto.prescriptor,
        ),
        stockLocation: await this.findOneStockLocationUseCase.findEntityByUuid(
          dto.stockLocation,
        ),
      };

      const userCreating = await this.findOneUserUseCase.findById(userId);

      const itemDispensationEntity =
        await this.itemDispensationRepository.create(
          {
            dispensationDate: binds.dispensationDate.getValue(),
            patient: binds.patient,
            prescriptor: binds.prescriptor,
            stockLocation: binds.stockLocation,
            userCreated: userCreating,
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

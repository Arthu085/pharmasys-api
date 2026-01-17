import { Inject, Injectable } from '@nestjs/common';

import { IExitItemTypeRepository } from '../../domain/repositories/exit-item-type.repository.interface';
import { InventoryExitDomainService } from '../../domain/services/inventory-exit-domain.service';
import { ExitTypeEnum } from '../../domain/enums/exit-type.enum';
import { ExitItemTypeEntity } from '../../domain/entities/exit-item-type.entity';

@Injectable()
export class FindOneExitItemTypeUseCase {
  constructor(
    @Inject(IExitItemTypeRepository)
    private readonly exitItemTypeRepository: IExitItemTypeRepository,
    private readonly inventoryExitDomainService: InventoryExitDomainService,
  ) {}

  async findByName(name: ExitTypeEnum): Promise<ExitItemTypeEntity> {
    const exitItemType = await this.exitItemTypeRepository.findByName(name);

    return this.inventoryExitDomainService.validateExitType(exitItemType);
  }
}

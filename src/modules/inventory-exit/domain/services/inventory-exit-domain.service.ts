import { Injectable } from '@nestjs/common';

import { InventoryExitEntity } from '../entities/inventory-exit.entity';
import { ExitItemTypeEntity } from '../entities/exit-item-type.entity';
import { InventoryExitNotFoundException } from '../exceptions/inventory-exit-not-found.exception';
import { ExitTypeNotFoundException } from '../exceptions/exit-type-not-found.exception';

@Injectable()
export class InventoryExitDomainService {
  constructor() {}

  validateInventoryExit(
    inventoryExitEntity: InventoryExitEntity | null,
  ): InventoryExitEntity {
    if (!inventoryExitEntity) {
      throw new InventoryExitNotFoundException();
    }

    return inventoryExitEntity;
  }

  validateExitType(exitType: ExitItemTypeEntity | null): ExitItemTypeEntity {
    if (!exitType) {
      throw new ExitTypeNotFoundException();
    }

    return exitType;
  }
}

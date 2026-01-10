import { Injectable } from '@nestjs/common';

import { ItemDispensationEntity } from '../entities/item-dispensation.entity';
import { ItemDispensationNotFoundException } from '../exceptions/item-dispensation-not-found.exception';
import { ItemDispensationPsychotropicNotificationNumberException } from '../exceptions/item-dispensation-psychotropic-notification-number.exception';

@Injectable()
export class ItemDispensationDomainService {
  constructor() {}

  validateItemDispensation(
    itemDispensationEntity: ItemDispensationEntity | null,
  ): ItemDispensationEntity {
    if (!itemDispensationEntity) {
      throw new ItemDispensationNotFoundException();
    }

    return itemDispensationEntity;
  }

  validatePsychotropicAndNotificationNumber(
    isPsychotropic: boolean,
    prescriptionNotificationNumber: string | null,
  ): void {
    if (isPsychotropic && !prescriptionNotificationNumber) {
      throw new ItemDispensationPsychotropicNotificationNumberException();
    }
  }
}

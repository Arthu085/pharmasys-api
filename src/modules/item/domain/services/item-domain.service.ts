import { Injectable } from '@nestjs/common';
import { BaseDomainService } from 'src/shared/domain/services/base-domain.service';
import { DosageEntity } from '../entities/dosage.entity';
import { DosageNotFoundException } from '../exceptions/dosage-not-found.exception';
import { PresentationEntity } from '../entities/presentation.entity';
import { PresentationNotFoundException } from '../exceptions/presentation-not-found.exception';
import { SubtypeEntity } from '../entities/subtype.entity';
import { SubtypeNotFoundException } from '../exceptions/subtype-not-found.exception';
import { TypeEntity } from '../entities/type.entity';
import { TypeNotFoundException } from '../exceptions/type-not-found.exception';
import { ItemEntity } from '../entities/item.entity';
import { ItemNotFoundException } from '../exceptions/item-not-found.exception';
import { TypeSubtypeConflictException } from '../exceptions/type-subtype-conflict.exception';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { TypeEnum } from '../enums/type.enum';

@Injectable()
export class ItemDomainService {
  constructor(private readonly baseDomainService: BaseDomainService) {}

  validateItem(item: ItemEntity | null): ItemEntity {
    if (!item) {
      throw new ItemNotFoundException();
    }

    return item;
  }

  validateItemAndEnsureActive(item: ItemEntity | null): ItemEntity {
    const validated = this.validateItem(item);
    validated.ensureIsActive();

    return validated;
  }

  validateItemSameStatus(item: ItemEntity, status: StatusEnum): void {
    this.baseDomainService.validateDifferentStatus(item, status);
  }

  validateDosage(dosage: DosageEntity | null): DosageEntity {
    if (!dosage) {
      throw new DosageNotFoundException();
    }

    return dosage;
  }

  validatePresentation(
    presentation: PresentationEntity | null,
  ): PresentationEntity {
    if (!presentation) {
      throw new PresentationNotFoundException();
    }

    return presentation;
  }

  validateSubtype(subtype: SubtypeEntity | null): SubtypeEntity {
    if (!subtype) {
      throw new SubtypeNotFoundException();
    }

    return subtype;
  }

  validateType(type: TypeEntity | null): TypeEntity {
    if (!type) {
      throw new TypeNotFoundException();
    }

    return type;
  }

  validateTypeAndSubtypeCompatibility(
    type: TypeEntity,
    subtype: SubtypeEntity | null,
  ): void {
    if (type.name !== TypeEnum.MEDICAMENTO && subtype) {
      subtype = null;

      throw new TypeSubtypeConflictException(
        'Subtipo só pode ser definido para Medicamentos',
      );
    }

    if (type.name === TypeEnum.MEDICAMENTO && !subtype) {
      subtype = null;

      throw new TypeSubtypeConflictException(
        'Subtipo é obrigatório para Medicamentos',
      );
    }
  }
}

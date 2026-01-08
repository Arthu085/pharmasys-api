import { Injectable } from '@nestjs/common';

import { EntryItemTypeEntity } from '../entities/entry-item-type.entity';
import { EntryTypeNotFoundException } from '../exceptions/entry-type-not-found.exception';
import { EntryTypeAndInvoiceNumberConflictException } from '../exceptions/entry-type-and-invoice-number-conflit.exception';
import { InventoryEntryEntity } from '../entities/inventory-entry.entity';
import { InventoryEntryNotFoundException } from '../exceptions/inventory-entry-not-found.exception';

@Injectable()
export class InventoryEntryDomainService {
  constructor() {}

  validateInventoryEntry(
    inventoryEntryEntity: InventoryEntryEntity | null,
  ): InventoryEntryEntity {
    if (!inventoryEntryEntity) {
      throw new InventoryEntryNotFoundException();
    }

    return inventoryEntryEntity;
  }

  validateEntryType(
    entryType: EntryItemTypeEntity | null,
  ): EntryItemTypeEntity {
    if (!entryType) {
      throw new EntryTypeNotFoundException();
    }

    return entryType;
  }

  validateTypeAndInvoiceNumber(
    entryType: EntryItemTypeEntity,
    invoiceNumber: string | null,
  ): void {
    if (entryType.isInvoiceRequired() && !invoiceNumber) {
      throw new EntryTypeAndInvoiceNumberConflictException(
        'Número de nota fiscal obrigatório para este tipo de entrada',
      );
    }

    if (!entryType.isInvoiceRequired() && invoiceNumber) {
      throw new EntryTypeAndInvoiceNumberConflictException(
        'Número de nota fiscal não deve ser informado para este tipo de entrada',
      );
    }
  }
}

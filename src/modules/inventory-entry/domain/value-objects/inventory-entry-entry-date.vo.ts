import { InvalidInventoryEntryEntryDateException } from '../exceptions/invalid-inventory-entry-entry-date.exception';

export class InventoryEntryEntryDate {
  private constructor(private readonly value: Date) {}

  static create(entryDate: Date): InventoryEntryEntryDate {
    if (!entryDate) {
      throw new InvalidInventoryEntryEntryDateException(
        'Data de entrada é obrigatória',
      );
    }

    return new InventoryEntryEntryDate(entryDate);
  }

  getValue(): Date {
    return this.value;
  }
}

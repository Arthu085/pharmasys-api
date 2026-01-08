import { InvalidInventoryExitExitDateException } from '../exceptions/invalid-inventory-exit-exit-date.exception';

export class InventoryExitExitDate {
  private constructor(private readonly value: Date) {}

  static create(exitDate: Date): InventoryExitExitDate {
    if (!exitDate) {
      throw new InvalidInventoryExitExitDateException(
        'Data de saída é obrigatória',
      );
    }

    return new InventoryExitExitDate(exitDate);
  }

  getValue(): Date {
    return this.value;
  }
}

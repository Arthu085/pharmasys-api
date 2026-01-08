import { InvalidInventoryEntryTotalValueException } from '../exceptions/invalid-inventory-entry-total-value.exception';

export class InventoryEntryTotalValue {
  private constructor(private readonly value: number) {}

  static create(totalValue: number): InventoryEntryTotalValue {
    if (!totalValue) {
      throw new InvalidInventoryEntryTotalValueException(
        'Valor total é obrigatório',
      );
    }

    if (totalValue < 0) {
      throw new InvalidInventoryEntryTotalValueException(
        'Valor total não pode ser negativo',
      );
    }

    return new InventoryEntryTotalValue(totalValue);
  }

  getValue(): number {
    return this.value;
  }
}

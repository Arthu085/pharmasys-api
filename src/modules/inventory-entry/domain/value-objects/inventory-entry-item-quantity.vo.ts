import { InvalidInventoryEntryItemQuantityException } from '../exceptions/invalid-inventory-entry-item-quantity.exception';

export class InventoryEntryItemQuantity {
  private constructor(private readonly value: number) {}

  static create(quantity: number): InventoryEntryItemQuantity {
    if (!quantity) {
      throw new InvalidInventoryEntryItemQuantityException(
        'Quantidade é obrigatória',
      );
    }

    if (quantity < 0) {
      throw new InvalidInventoryEntryItemQuantityException(
        'Quantidade não pode ser negativa',
      );
    }

    return new InventoryEntryItemQuantity(quantity);
  }

  getValue(): number {
    return this.value;
  }
}

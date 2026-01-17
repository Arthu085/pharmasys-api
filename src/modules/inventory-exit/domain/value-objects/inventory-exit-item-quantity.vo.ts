import { InvalidInventoryExitItemQuantityException } from '../exceptions/invalid-inventory-exit-item-quantity.exception';

export class InventoryExitItemQuantity {
  private constructor(private readonly value: number) {}

  static create(quantity: number): InventoryExitItemQuantity {
    if (!quantity) {
      throw new InvalidInventoryExitItemQuantityException(
        'Quantidade é obrigatória',
      );
    }

    if (quantity < 0) {
      throw new InvalidInventoryExitItemQuantityException(
        'Quantidade não pode ser negativa',
      );
    }

    return new InventoryExitItemQuantity(quantity);
  }

  getValue(): number {
    return this.value;
  }
}

import { InvalidItemDispensationItemQuantityException } from '../exceptions/invalid-item-dispensation-item-quantity.exception';

export class ItemDispensationItemQuantity {
  private constructor(private readonly value: number) {}

  static create(quantity: number): ItemDispensationItemQuantity {
    if (!quantity) {
      throw new InvalidItemDispensationItemQuantityException(
        'Quantidade é obrigatória',
      );
    }

    if (quantity < 0) {
      throw new InvalidItemDispensationItemQuantityException(
        'Quantidade não pode ser negativa',
      );
    }

    return new ItemDispensationItemQuantity(quantity);
  }

  getValue(): number {
    return this.value;
  }
}

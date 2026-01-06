import { InvalidInventoryEntryItemUnitPriceException } from '../exceptions/invalid-inventory-entry-item-unit-price.exception';

export class InventoryEntryItemUnitPrice {
  private constructor(private readonly value: number) {}

  static create(unitPrice: number): InventoryEntryItemUnitPrice {
    if (!unitPrice) {
      throw new InvalidInventoryEntryItemUnitPriceException(
        'Preço unitário é obrigatório',
      );
    }

    if (unitPrice < 0) {
      throw new InvalidInventoryEntryItemUnitPriceException(
        'Preço unitário não pode ser negativo',
      );
    }

    return new InventoryEntryItemUnitPrice(unitPrice);
  }

  getValue(): number {
    return this.value;
  }
}

import { InvalidStockTransferItemQuantityException } from '../exceptions/invalid-stock-transfer-item-quantity.exception';

export class StockTransferItemQuantity {
  private constructor(private readonly value: number) {}

  static create(quantity: number): StockTransferItemQuantity {
    if (!quantity) {
      throw new InvalidStockTransferItemQuantityException(
        'Quantidade é obrigatória',
      );
    }

    if (quantity < 0) {
      throw new InvalidStockTransferItemQuantityException(
        'Quantidade não pode ser negativa',
      );
    }

    return new StockTransferItemQuantity(quantity);
  }

  getValue(): number {
    return this.value;
  }
}

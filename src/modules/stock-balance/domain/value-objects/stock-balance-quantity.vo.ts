import { InvalidStockBalanceQuantityException } from '../exceptions/invalid-stock-balance-quantity.exception';

export class StockBalanceQuantity {
  private constructor(private readonly value: number) {}

  static create(quantity: number): StockBalanceQuantity {
    if (!quantity || quantity < 0) {
      throw new InvalidStockBalanceQuantityException();
    }

    return new StockBalanceQuantity(quantity);
  }

  getValue(): number {
    return this.value;
  }
}

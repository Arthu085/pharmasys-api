import { InvalidStockTransferDateException } from '../exceptions/invalid-stock-transfer-date.exception';

export class StockTransferDate {
  private constructor(private readonly value: Date) {}

  static create(transferDate: Date): StockTransferDate {
    if (!transferDate) {
      throw new InvalidStockTransferDateException(
        'Data de transferência é obrigatória',
      );
    }

    return new StockTransferDate(transferDate);
  }

  getValue(): Date {
    return this.value;
  }
}

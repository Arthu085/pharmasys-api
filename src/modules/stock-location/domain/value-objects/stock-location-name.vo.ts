import { InvalidStockLocationNameException } from '../exceptions/invalid-stock-location-name.exception';

export class StockLocationName {
  private constructor(private readonly value: string) {}

  static create(name: string): StockLocationName {
    const trimmedName = name.trim();

    if (!trimmedName || trimmedName.length < 3) {
      throw new InvalidStockLocationNameException(
        'Nome do local de estoque deve ter no mínimo 3 caracteres',
      );
    }

    if (trimmedName.length > 100) {
      throw new InvalidStockLocationNameException(
        'Nome do local de estoque deve ter no máximo 100 caracteres',
      );
    }

    return new StockLocationName(trimmedName);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: StockLocationName): boolean {
    return this.value === other.value;
  }
}
